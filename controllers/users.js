import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "./task.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    let user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(new ErrorHandler("Invalid Email or Password", 404));
    }
    sendCookie(user, res, `Welcome aboard ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      next(new ErrorHandler("User Already Exists", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    // Adding cookie to mark the user logged in
    sendCookie(user, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};
export const getMyData = (req, res) => {
  res.json(req.user);
};
