import app from "./app";
import cors from "cors";

// Agregar configuración de CORS antes de iniciar el servidor
app.use(
  cors({
    origin: "*", // Permitir cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Permitir todos los métodos HTTP
    allowedHeaders: ["Content-Type", "Authorization"], // Permitir ciertos encabezados
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
