import request from 'supertest';
import app from '../app.js'; // Import your Express app
import mongoose from 'mongoose';
import Url from '../models/url.js'; // Import your Url model

beforeAll(async () => { // Import your Url model 
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
/* *
 *Provides a unit test for the POST request to the /shorten endpoint in @shorterner.js
 *The "it" funtion provided by Jest specifies what the actual function should do. 
 */
  describe('POST /shorten', () => {
    it('should shorten a valid URL', async () => {
      const res = await request(app)
        .post('/shorten')
        .send({
          originalUrl: 'https://example.com',
        });
      expect(res.statusCode).toEqual(200);  // Checks that request is Succesful
      expect(res.body).toHaveProperty('shortUrl');
    }); 
  });
  