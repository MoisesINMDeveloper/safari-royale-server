import express from "express";
import { getUserData } from "../controllers/userDataController";

const router = express.Router();

router.get("/getdatauser", getUserData);

export default router;
