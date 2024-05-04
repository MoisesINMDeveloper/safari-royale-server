"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import cors from "cors";
// Agregar configuración de CORS antes de iniciar el servidor
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type, Accept",
//   })
// );
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
