process.env.TZ = "UTC";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appRoutes from "./app";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/api", appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
