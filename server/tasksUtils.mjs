import mongoose from "mongoose";
import { taskModel } from "./schemas.mjs";

export const addNewTask = async ({
  title,
  description,
  completed,
}) => {

  const newTask = new taskModel({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    completed: completed,
    user: new mongoose.Types.ObjectId('5e9f8f9f8d8f8b1c8c8f8f8f'),
  });

  newTask.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const deleteTask = async ({
  id,
}) => {
  const task = await taskModel.findById(id);
  task.remove((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const completeTask = async ({
  id,
}) => {
  const task = await taskModel.findById(id);
  task.completed = !task.completed;
  task.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const getAllTasks = async () => {
  const tasks = await taskModel.find({});
  return tasks;
};