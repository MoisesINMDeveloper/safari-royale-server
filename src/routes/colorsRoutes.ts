import express from "express";
import {
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor,
} from "../controllers/colorsController";

const router = express.Router();
router.post("/", createColor);
router.get("/", getAllColors);
router.get("/:id", getColorById);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);
export default router;
