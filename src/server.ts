import express from "express";
import cors from "cors";

const app = express();

const whitelist = [
  "http://localhost:3000", // Agregar dominios locales
  "http://127.0.0.1:3000",
  "https://www.google.com", // Ejemplo de dominio de buscador
  "https://www.bing.com", // Otro ejemplo de dominio de buscador
];

const corsOptions = {
  origin: whitelist,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Resto de la configuración de tu aplicación...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
