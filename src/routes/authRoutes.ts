import express from "express";
import { login, register, verifyCode } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyCode);
router.post("/login", login);
export default router;
