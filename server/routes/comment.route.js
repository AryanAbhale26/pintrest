import express from "express";
import {
  addComment,
  getPostComments,
} from "../controller/comment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/:postId", getPostComments);

router.post("/", verifyToken, addComment);
export default router;
