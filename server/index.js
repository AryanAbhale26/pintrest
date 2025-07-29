import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import commentRouter from "./routes/comment.route.js";
import pinRouter from "./routes/pin.route.js";
import mongoose from "mongoose";
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(fileUpload());
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/pins", pinRouter);
app.use("/boards", boardRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
