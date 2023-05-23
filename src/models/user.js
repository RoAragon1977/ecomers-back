import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import producto from "./producto";

const userScheme = new Schema({
  email: String,
  passwordHash: String,
  photoUrl: String,
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  bloqueado: {
    default: false,
    type: Boolean,
  },
  allowsLocaStorage: {
    default: false,
    type: Boolean,
  },
});

userScheme.methods.generateAccesToken = function () {
  const  token = jwt.sign({ _id: this._id }, 'mi secreto');
  return token;
};

export default mongoose.model("User", userScheme);