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
      required_: false,
      unique: true
    },
    password: {
      type: String,
      required_: true,
    }
  },
  {timestamps: true}
);

const User = mongoose.model("user".userSchema);

export default User;