import app from "./app";
import cors from "cors";

// Configuración del middleware CORS
app.use(
  cors({
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir varios métodos HTTP
    allowedHeaders: "Content-Type, Accept", // Permitir ciertos encabezados
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
