import express from "express";
import autenticateToken from "../middleware/autenticateToken";
import {
  createPhone,
  getAllPhone,
  getPhoneById,
  updatePhone,
  deletePhone,
} from "../controllers/phone.Controller";

const router = express.Router();

// Ruta para crear un nuevo banco
router.post("/api/v1/phone", autenticateToken, createPhone);

// Ruta para obtener todos los bancos
router.get("/api/v1/phone", autenticateToken, getAllPhone);

// Ruta para obtener un banco por su ID
router.get("/api/v1/phone/:id", autenticateToken, getPhoneById);

// Ruta para actualizar un banco por su ID
router.put("/api/v1/phone/:id", autenticateToken, updatePhone);

// Ruta para eliminar un banco por su ID
router.delete("/api/v1/phone/:id", autenticateToken, deletePhone);

export default router;
