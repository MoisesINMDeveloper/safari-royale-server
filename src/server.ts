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
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Resto de la configuración de tu aplicación...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
