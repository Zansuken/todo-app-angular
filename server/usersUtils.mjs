import mongoose from "mongoose";
import { userModel } from "./schemas.mjs";

export const addNewUser = async ({
  username,
  password,
  theme,
}) => {
  const newUser = new userModel({
    _id: new mongoose.Types.ObjectId(),
    username: username,
    password: password,
    theme: false,
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const deleteUser = async ({
  id,
}) => {
  const user = await userModel.findById(id);
  user.remove((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const switchTheme = async ({
  id
}) => {
  const user = await userModel.findById(id);
  user.theme = !user.theme;
  user.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};