import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import bankRoutes from "./routes/bankRoutes";
import combinationRoutes from "./routes/combinationRoutes";
import ticketsRoutes from "./routes/ticketRoutes";
import usersRoutes from "./routes/usersRoutes";
import animalsRoutes from "./routes/animalRoutes";
import colorsRoutes from "./routes/colorsRoutes";
import phoneRoutes from "./routes/phoneRoutes";
import authenticateToken from "./middleware/autenticateToken";
import getDataUserRoutes from "./routes/getDataUserRoutes";
import raffleRoutes from "./routes/raffleRoutes";

const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json());

// Middleware para manejar las solicitudes OPTIONS (preflight)
app.options("*", cors());

// Rutas
app.use("/v1/animals", authenticateToken("ADMIN"), animalsRoutes);
app.use("/v1/colors", authenticateToken("ADMIN"), colorsRoutes);
app.use("/v1/phones", authenticateToken("ADMIN"), phoneRoutes); // Ruta para las operaciones del teléfono
app.use("/v1/banks", authenticateToken("ADMIN"), bankRoutes); // Ruta para las operaciones del banco
app.use("/v1/raffles", authenticateToken("ADMIN"), raffleRoutes);
app.use("/v1/auth", authRoutes); // Ruta para la autenticación
app.use("/v1/tickets", authenticateToken(), ticketsRoutes);
app.use("/v1/combinations", authenticateToken(), combinationRoutes);
app.use("/v1/users", usersRoutes); // Ruta para las operaciones de los usuarios
app.use("/v1/auth", authenticateToken(), getDataUserRoutes);

// Exportar la aplicación Express
export default app;
