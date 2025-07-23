import express from "express";
import { getPostComments } from "../controller/comment.controller.js";

const router = express.Router();
router.get("/:postId", getPostComments);
export default router;
