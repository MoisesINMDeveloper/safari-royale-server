import express from "express";
import authenticateToken from "../middleware/autenticateToken";
import { getUserData } from "../controllers/userDataController";

const router = express.Router();

router.get("/getdatauser", authenticateToken, getUserData);

export default router;
