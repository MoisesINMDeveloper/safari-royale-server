import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";

import usersRoutes from "./routes/usersRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Routes

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
// Construir api rest para user
export default app;
