import express from "express";
import cors from "cors";

const app = express();

// Middleware de CORS
app.use(cors());

// Resto de la configuración de tu aplicación...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
