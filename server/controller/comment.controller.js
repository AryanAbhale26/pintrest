import Comment from "../model/comment.model.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const getPostComments = async (req, resp) => {
  const { postId } = req.params;
  const comments = await Comment.find({ pin: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });
  resp.status(200).json(comments);
};
export const addComment = async (req, resp) => {
  try {
    const { description, pin } = req.body;
    const comment = await Comment.create({
      description,
      pin,
      user: req.userId,
    });
    resp.status(201).json(comment);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Error adding comment" });
  }
};
