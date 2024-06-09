import express from "express";
import { login, register, verifyCode } from "../controllers/authController";
import { getUserData } from "../controllers/userDataController";
import autenticateToken from "../middleware/autenticateToken";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyCode);
router.get("/getdatauser", autenticateToken, getUserData);
router.post("/login", login);
export default router;
