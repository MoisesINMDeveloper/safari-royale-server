import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import usersRoutes from "./routes/usersRoutes";
import phoneRoutes from "./routes/phoneRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Configurar CORS en cada ruta
const corsOptions = {
  origin: "*", // Permitir solicitudes desde cualquier origen
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir varios métodos HTTP
  allowedHeaders: "Content-Type, Accept", // Permitir ciertos encabezados
};

// Routes
app.use("/api/v1/auth", cors(corsOptions), authRoutes);
app.use("/api/v1/", cors(corsOptions), phoneRoutes);
app.use("/api/v1/", cors(corsOptions), bankRoutes);
app.use("/api/v1/users", cors(corsOptions), usersRoutes);

// Construir api rest para user
export default app;
