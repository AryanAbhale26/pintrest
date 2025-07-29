import Pin from "../model/pin.model.js";
import User from "../model/user.model.js";
import Board from "../model/board.model.js";
import mongoose from "mongoose";
import Like from "../model/like.model.js";
import Save from "../model/save.model.js";
import sharp from "sharp";
import ImageKit from "imagekit";
import jwt from "jsonwebtoken";

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

export const createPin = async (req, res) => {
  try {
    const {
      title,
      description,
      link,
      board,
      tags,
      textOptions,
      canvasOptions,
      newBoard,
    } = req.body;

    const media = req.files?.media;
    if (!title || !description || !media) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const parsedTextOptions = JSON.parse(textOptions || "{}");
    const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

    let metadata = await sharp(media.data).metadata();
    const originalOrientation =
      metadata.width < metadata.height ? "portrait" : "landscape";
    const originalAspectRatio = metadata.width / metadata.height;

    let clientAspectRatio =
      parsedCanvasOptions.size !== "original"
        ? parsedCanvasOptions.size.split(":")[0] /
          parsedCanvasOptions.size.split(":")[1]
        : parsedCanvasOptions.orientation === originalOrientation
        ? originalAspectRatio
        : 1 / originalAspectRatio;

    // Limit size for ImageKit safety
    let width = Math.min(2000, metadata.width);
    let height = Math.round(width / clientAspectRatio);

    // Preprocess image with Sharp (resize + padding)
    const processedBuffer = await sharp(media.data)
      .resize({
        width,
        height,
        fit: "contain",
        background: parsedCanvasOptions.backgroundColor || "#FFFFFF",
      })
      .toBuffer();

    const imagekit = new ImageKit({
      publicKey: process.env.IK_PUBLIC_KEY,
      privateKey: process.env.IK_PRIVATE_KEY,
      urlEndpoint: process.env.IK_URL_ENDPOINT,
    });

    // Upload final preprocessed image (NO transformation now)
    const response = await imagekit.upload({
      file: processedBuffer,
      fileName: media.name,
      folder: "test",
    });

    let newBoardId;
    if (newBoard) {
      const boardRes = await Board.create({
        title: newBoard,
        user: req.userId,
      });
      newBoardId = boardRes._id;
    }

    const newPin = await Pin.create({
      user: req.userId,
      title,
      description,
      link: link || null,
      board: newBoardId || board || null,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      media: response.filePath,
      width: response.width,
      height: response.height,
    });

    return res.status(201).json(newPin);
  } catch (err) {
    console.error("Error in createPin:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ likeCount, isLiked: false, isSaved: false });
    }

    const userId = payload.userId;

    const isLiked = await Like.findOne({
      user: userId,
      pin: id,
    });
    const isSaved = await Save.findOne({
      user: userId,
      pin: id,
    });

    return res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await Like.findOne({
      pin: id,
      user: req.userId,
    });

    if (isLiked) {
      await Like.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Like.create({
        pin: id,
        user: req.userId,
      });
    }
  } else {
    const isSaved = await Save.findOne({
      pin: id,
      user: req.userId,
    });

    if (isSaved) {
      await Save.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Save.create({
        pin: id,
        user: req.userId,
      });
      console.log("SAVED by user:", req.userId, "for pin:", id);
    }
  }

  return res.status(200).json({ message: "Successful" });
};
