import express from "express";
import { getUserBoards } from "../controller/board.controller.js";

const router = express.Router();
router.get("/:userId", getUserBoards);
export default router;
