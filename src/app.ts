import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import usersRoutes from "./routes/usersRoutes";
import phoneRoutes from "./routes/phoneRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", phoneRoutes);
app.use("/api/v1/", bankRoutes);
app.use("/api/v1/users", usersRoutes);
// Construir api rest para user
export default app;
