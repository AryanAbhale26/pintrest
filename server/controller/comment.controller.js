import Comment from "../model/comment.model.js";
import User from "../model/user.model.js";
export const getPostComments = async (req, resp) => {
  const { postId } = req.params;
  const comments = await Comment.find({ pin: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });
  resp.status(200).json(comments);
};
