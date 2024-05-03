import app from "./app";
import cors from "cors";

// Definir los dominios permitidos en un arreglo
const allowedOrigins = [
  "http://localhost:3000",
  "https://safari-royale-server-production.up.railway.app",
];

// Agregar configuración de CORS antes de iniciar el servidor
app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200, // algunas versiones de cors requieren esto
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
