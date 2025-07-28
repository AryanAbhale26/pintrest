import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  followUser,
} from "../controller/user.controller.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", async (req, resp) => {
  try {
    const userInfo = req.body;
    const hashedPassword = await bcrypt.hash(req.body.hashedPassword, 10);
    console.log(userInfo);
    await User.create({
      displayName: req.body.displayName,
      userName: req.body.userName,
      email: req.body.email,
      img: req.body.img,
      hashedPassword: hashedPassword,
    });
    resp.json("Successfully created user");
  } catch (error) {
    console.error(error);
    resp.status(404).json({ message: "Error in creating the User" });
  }
});
router.get("/:userName", getUser);
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.post("/follow/:userName", verifyToken, followUser);

export default router;
