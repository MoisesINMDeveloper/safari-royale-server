import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import usersRoutes from "./routes/usersRoutes";
import autenticateToken from "./middleware/autenticateToken";

dotenv.config();

const app = express();

app.use(express.json());

// Routes

app.use("/auth", authRoutes);
// app.use("/", autenticateToken);
app.use("/", bankRoutes);
app.use("/users", usersRoutes);
// Construir api rest para user
export default app;
