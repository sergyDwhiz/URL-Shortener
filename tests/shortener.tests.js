import request from ('supertest'); 
const app = require('../app'); // Import your Express app import app from (../app);
import mongoose from 'mongoose';
import Url from ('../models/url');
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