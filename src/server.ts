import express from "express";
import cors from "cors"; // Importa la función cors desde el paquete cors

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
