import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import { getAllTasks } from './tasksUtils.mjs';
import { getAllUsers, switchTheme } from './usersUtils.mjs';

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

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  switchTheme({
    id: '6270e56ffad563f64eac649c',
    theme: false ? true : false,
  });
  getAllUsers().then((users) => {
    res.send(users);
  });
});

app.get('/tasks', (req, res) => {
  getAllTasks().then((tasks) => {
    res.send(tasks);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});