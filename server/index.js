import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import commentRouter from "./routes/comment.route.js";
import pinRouter from "./routes/pin.route.js";
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(fileUpload());

// Routes
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/pins", pinRouter);
app.use("/boards", boardRouter);

// Connect DB & start server
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
