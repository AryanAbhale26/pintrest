import Pin from "../model/pin.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const getPins = async (req, resp) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search || "";
  const LIMIT = 21;
  const userId = req.query.userId;
  const boardId = req.query.boardId;

  try {
    const pins = await Pin.find(
      search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { tags: { $in: [search] } },
            ],
          }
        : userId
        ? { user: userId }
        : boardId
        ? { board: boardId }
        : {}
    )
      .limit(LIMIT)
      .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;

    // await new Promise((resolve) => setTimeout(resolve, 500));

    resp.status(200).json({
      pins,
      nextCursor: hasNextPage ? pageNumber + 1 : null,
    });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

export const getPin = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const pin = await Pin.findById(id).populate(
      "user",
      "userName img displayName"
    );

    if (!pin) {
      return resp.status(404).json({ error: "Pin not found" });
    }

    resp.status(200).json(pin);
  } catch (err) {
    console.error("Error in getPin:", err);
    resp.status(500).json({ error: err.message });
  }
};
