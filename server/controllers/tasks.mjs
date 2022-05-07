import mongoose from "mongoose";
import { taskModel } from "../schemas.mjs";

export const getTasks = async (req, res) => {
  const tasks = await taskModel.find({});
  res.send(tasks);
}

export const createTask = async (req, res) => {
  const newTask = new taskModel({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    user: req.body.user,
  })
  newTask.save((err) => {
    if (err) {
      console.log(err);
    }
  })
  res.send(newTask);
}

export const updateTask = async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  task.title = req.body.title;
  task.description = req.body.description;
  task.completed = req.body.completed;
  task.user = req.body.user;
  task.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(task);
}

export const deleteTask = async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  task.remove((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(task);
}