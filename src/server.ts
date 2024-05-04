import app from "./app";
import cors from "cors";

// Configuración del middleware CORS
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
