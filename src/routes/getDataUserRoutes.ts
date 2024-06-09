import express from "express";
import autenticateToken from "../middleware/autenticateToken";
import { getUserData } from "../controllers/userDataController";

const router = express.Router();

router.get("/getdatauser", autenticateToken, getUserData);

export default router;
