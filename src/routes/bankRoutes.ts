import express from "express";
import {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
} from "../controllers/bankController";

const router = express.Router();

// Ruta para crear un nuevo banco
router.post("/", createBank);

// Ruta para obtener todos los bancos
router.get("/", getAllBanks);

// Ruta para obtener un banco por su ID
router.get("/:id", getBankById);

// Ruta para actualizar un banco por su ID
router.put("/:id", updateBank);

// Ruta para eliminar un banco por su ID
router.delete("/:id", deleteBank);

export default router;
