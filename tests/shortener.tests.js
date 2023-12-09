const request = require('supertest');
const app = require('../app'); // Import your Express app
const mongoose = require('mongoose');
const Url = require('../models/url'); // Import your Url model
beforeAll(async () => {
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