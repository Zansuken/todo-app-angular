import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes.mjs';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 6300;
const URI_ID = process.env.URI_ID;
const MONGO_URI = `mongodb+srv://admin:${URI_ID}@cluster0.2wyny.mongodb.net/users`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Error connecting to MongoDB Atlas...', err);
  } else {
    console.log('Connected to MongoDB Atlas');
  }
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});