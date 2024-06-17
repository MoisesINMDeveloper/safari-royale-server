import { Router } from "express";
import {
  deleteCombination,
  getCombinations,
  getCombinationById,
  updateCombination,
  createCombination,
} from "../controllers/combinationController";

const router = Router();

router.post("/", createCombination);
router.get("/", getCombinations);
router.get("/:id", getCombinationById);
router.put("/:id", updateCombination);
router.delete("/:id", deleteCombination);
export default router;
