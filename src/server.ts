import app from "./app";
import cors from "cors";

const whiteList = ["http://localhost:3000"];
app.use(cors({ origin: whiteList }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
