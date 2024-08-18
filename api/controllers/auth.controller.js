// auth.controller.js

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to create error objects
const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Basic input validation (you can add more checks as needed)
    if (!username || !email || !password) {
      return next(createError(400, "All fields are required"));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "User with this email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" }); 
  } catch (error) {
    next(error); 
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password:pass, ...otherUserData } = user.toObject();

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherUserData);
  } catch (error) {
    next(error); 
  }
};