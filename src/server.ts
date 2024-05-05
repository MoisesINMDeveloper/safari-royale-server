import app from "./app";
import cors from "cors";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
