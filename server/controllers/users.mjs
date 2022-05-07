import mongoose from "mongoose";
import { userModel } from "../schemas.mjs";

export const getUsers = async (req, res) => {
  const users = await userModel.find({});
  res.send(users);
};

export const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.send(user);
}

export const createUser = async (req, res) => {
  const newUser = new userModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  newUser.save((err) => {
    if (err) {
      console.log(err);
    }
  })
  res.send(newUser);
}

export const updateUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(user);
}

export const deleteUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  user.remove((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send(user);
}



