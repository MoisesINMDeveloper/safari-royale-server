import app from "./app";
import cors from "cors";

const PORT = process.env.PORT;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
