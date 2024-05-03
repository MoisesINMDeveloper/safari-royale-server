import express from "express";
import autenticateToken from "../middleware/autenticateToken";
import {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
} from "../controllers/bankController";

const router = express.Router();

// Ruta para crear un nuevo banco
router.post("/banks", autenticateToken, createBank);

// Ruta para obtener todos los bancos
router.get("/banks", autenticateToken, getAllBanks);

// Ruta para obtener un banco por su ID
router.get("/banks/:id", autenticateToken, getBankById);

// Ruta para actualizar un banco por su ID
router.put("/banks/:id", autenticateToken, updateBank);

// Ruta para eliminar un banco por su ID
router.delete("/banks/:id", autenticateToken, deleteBank);

export default router;