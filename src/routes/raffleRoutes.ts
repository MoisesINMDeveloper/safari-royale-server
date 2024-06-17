import express from "express";
import {
  createRaffle,
  updateRaffle,
  deleteRaffle,
  getRaffles,
  getRaffleById,
} from "../controllers/raffleController";

const adminRouter = express.Router();

adminRouter.post("/", createRaffle);
adminRouter.put("/:id", updateRaffle);
adminRouter.delete("/:id", deleteRaffle);
adminRouter.get("/", getRaffles);
adminRouter.get("/:id", getRaffleById);

export default adminRouter;
