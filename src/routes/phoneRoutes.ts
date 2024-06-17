import express from "express";
import {
  createPhone,
  getAllPhone,
  getPhoneById,
  updatePhone,
  deletePhone,
} from "../controllers/phone.Controller";

const router = express.Router();

// Ruta para crear un nuevo banco
router.post("/", createPhone);

// Ruta para obtener todos los bancos
router.get("/", getAllPhone);

// Ruta para obtener un banco por su ID
router.get("/:id", getPhoneById);

// Ruta para actualizar un banco por su ID
router.put("/:id", updatePhone);

// Ruta para eliminar un banco por su ID
router.delete("/:id", deletePhone);

export default router;
