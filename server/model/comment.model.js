import mongoose, { Schema } from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      ref: "Pin",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Comments", commentsSchema);
