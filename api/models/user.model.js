import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: false, // Corrected here
      unique: true
    },
    password: {
      type: String,
      required: true, // Corrected here
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema); // Corrected here

export default User;