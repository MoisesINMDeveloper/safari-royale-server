import express from "express";
import cors from "cors";

const app = express();

// Configuración de opciones de CORS
const corsOptions = {
  origin: "http://localhost:3000", // Permitir solicitudes desde localhost:3000
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Aplicar las opciones de CORS al middleware de Express
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
