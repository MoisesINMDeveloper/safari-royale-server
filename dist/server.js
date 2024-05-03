"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const cors_1 = __importDefault(require("cors"));
// Definir los dominios permitidos en un arreglo
const allowedOrigins = [
    "http://localhost:3000",
    "https://safari-royale-server-production.up.railway.app",
];
// Agregar configuración de CORS antes de iniciar el servidor
app_1.default.use((0, cors_1.default)({
    origin: allowedOrigins,
    optionsSuccessStatus: 200, // algunas versiones de cors requieren esto
}));
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
