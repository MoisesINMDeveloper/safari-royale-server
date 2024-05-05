import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import usersRoutes from "./routes/usersRoutes";
import phoneRoutes from "./routes/phoneRoutes";

const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json());

// Middleware para manejar las solicitudes OPTIONS (preflight)
app.options("*", cors());

// Rutas
app.use("/v1/auth", authRoutes); // Ruta para la autenticación
app.use("/v1/phones", phoneRoutes); // Ruta para las operaciones del teléfono
app.use("/v1/banks", bankRoutes); // Ruta para las operaciones del banco
app.use("/v1/users", usersRoutes); // Ruta para las operaciones de los usuarios

// Exportar la aplicación Express
export default app;
