import express from "express";
import autenticateToken from "../middleware/autenticateToken";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const router = express.Router();
router.post("/", autenticateToken, createUser);

router.get("/", autenticateToken, getAllUsers);

router.get("/:id", autenticateToken, getUserById);

router.put("/:id", autenticateToken, updateUser);

router.delete("/:id", autenticateToken, deleteUser);
export default router;
