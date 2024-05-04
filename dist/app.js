"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankRoutes_1 = __importDefault(require("./routes/bankRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rutas
app.use("/api/auth", authRoutes_1.default); // Ruta para la autenticación
app.use("/api/phone", phoneRoutes_1.default); // Ruta para las operaciones del teléfono
app.use("/api/bank", bankRoutes_1.default); // Ruta para las operaciones del banco
app.use("/api/users", usersRoutes_1.default); // Ruta para las operaciones de los usuarios
// Exportar la aplicación Express
exports.default = app;
