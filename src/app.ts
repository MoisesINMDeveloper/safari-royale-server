import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import usersRoutes from "./routes/usersRoutes";
import phoneRoutes from "./routes/phoneRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes); // Ruta para la autenticación
app.use("/api/phone", phoneRoutes); // Ruta para las operaciones del teléfono
app.use("/api/bank", bankRoutes); // Ruta para las operaciones del banco
app.use("/api/users", usersRoutes); // Ruta para las operaciones de los usuarios

// Exportar la aplicación Express
export default app;
