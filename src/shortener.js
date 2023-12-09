import express from ('express'); // For creating the server
import mongoose from ('mongoose'); // For interacting with MongoDB
import shortId from ('shortid'); // For generating unique short IDs
import validUrl from ('valid-url');  // For validating URLs

const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.error('Error connecting to MongoDB:', error));

// MongoDB schema for storing URLs
/**
 Each URL document will contain the original URL,
 the shortened URL, a unique code for the shortened URL, 
 and a timestamp for when the document was created.
**/
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  urlCode: String,
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

app.use(express.json()); // For parsing json request bodies. 

/** 
 * Route that expects a request body with an originalUrl property. 
 * If the provided URL is valid, it checks the database using @findOne to see if it has
 * been shortened before. If it has, the existing document is returned. 
 * Else a new document is created with a unique code, saved to the database, 
 * and then returned in the response. If an error occurs during this process, 
 * it is passed to the next middleware function.
 */
app.post('/shorten', async (req, res, next) => {
  const { originalUrl, urlCode:customUrlCode } = req.body;
  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });
      if (url) {
        res.send(url);
      } else {
        let urlCode;
        if(customUrlCode){
            const existingUrl = await Url.findOne({ urlCode: customUrlCode });
            if(existingUrl){
                return res.status(400).send('Custom URL already exists');
            }
            urlCode = customUrlCode;
        }else{
            urlCode = shortId.generate();
        }
        const shortUrl = `http://short.url/${urlCode}`;
        url = new Url({ originalUrl, shortUrl, urlCode });
        await url.save();
        res.send(url); 
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).send('Invalid URL');
  }
});

/**
 * Expects a URL code as a route parameter. 
 * Checks if a document with the provided code exists, if yes, the user is redirected to the original URL. 
 * Else a 404 Not Found error is returned.
 */
app.get('/:urlCode', async (req, res, next) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found'); // 404 Not Found
    }
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something up here!'); // 500 Internal Server Error  
});

app.listen(3000, () => console.log('Listening on port 3000'));

// Path: src/index.js