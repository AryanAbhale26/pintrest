import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Follow from "../model/follow.model.js";

export const getUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

    const followerCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });

    const token = req.cookies.token;
    let isFollowing = false;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SEC);
        const isExists = await Follow.exists({
          follower: payload.userId,
          following: user._id,
        });
        isFollowing = !!isExists;
      } catch (err) {
        // token invalid, ignore
      }
    }

    res.status(200).json({
      ...detailsWithoutPassword,
      followerCount,
      followingCount,
      isFollowing,
    });
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

export const followUser = async (req, resp) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return resp.status(404).json({ message: "User not found!" });
    }

    const isFollowing = await Follow.exists({
      follower: req.userId,
      following: user._id,
    });

    if (isFollowing) {
      await Follow.deleteOne({ follower: req.userId, following: user._id });
    } else {
      await Follow.create({ follower: req.userId, following: user._id });
    }

    resp.status(200).json({ message: "Successful" });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Server error", error });
  }
};
