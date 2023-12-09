import express from ('express');
import mongoose from ('mongoose');
import shortId from ('shortid');
import validUrl from ('valid-url');  

const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.error('Error connecting to MongoDB:', error));

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  urlCode: String,
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

app.use(express.json());

app.post('/shorten', async (req, res, next) => {
  const { originalUrl } = req.body;
  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });
      if (url) {
        res.send(url);
      } else {
        const urlCode = shortId.generate();
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

app.get('/:urlCode', async (req, res, next) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Listening on port 3000'));
