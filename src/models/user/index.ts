import mongoose from "mongoose";
import { User } from "@utils";

const Schema = mongoose.Schema;

const user = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("user", user);
