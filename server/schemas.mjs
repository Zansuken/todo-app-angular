import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  theme: Boolean,
});

export const userModel = mongoose.model('Users', UserSchema);

export const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const taskModel = mongoose.model('Tasks', TaskSchema);