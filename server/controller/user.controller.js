import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (!user) return res.status(404).json({ message: "User not found" });
    const { hashedPassword, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const registerUser = async (req, res) => {
  const { userName, displayName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists!" });
  }

  const newHashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    displayName,
    email,
    hashedPassword: newHashedPassword,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const { hashedPassword, ...rest } = user._doc;
  res.status(201).json(rest);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const { hashedPassword, ...rest } = user._doc;
  res.status(200).json(rest);
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
