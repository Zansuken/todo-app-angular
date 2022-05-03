import express from 'express';
import mongoose from 'mongoose';
import { taskModel, userModel } from './schemas.mjs';
import { completeTask, deleteTask, getAllTasks } from './tasksUtils.mjs';
import { addNewUser, getAllUsers, switchTheme } from './usersUtils.mjs';

const app = express();
const PORT = process.env.PORT || 6300;

mongoose.connect('mongodb+srv://admin:GD2FGodbYZJ4KXmF@cluster0.2wyny.mongodb.net/users', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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