import express from "express";
import {
  createAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from "../controllers/animalsController";

const router = express.Router();
router.post("/", createAnimal);
router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);
export default router;
