"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankRoutes_1 = __importDefault(require("./routes/bankRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Habilitar CORS para todas las rutas
app.use(express_1.default.json());
// Middleware para manejar las solicitudes OPTIONS (preflight)
app.options("*", (0, cors_1.default)());
// Rutas
app.use("/v1/auth", authRoutes_1.default); // Ruta para la autenticación
app.use("/v1/phones", phoneRoutes_1.default); // Ruta para las operaciones del teléfono
app.use("/v1/banks", bankRoutes_1.default); // Ruta para las operaciones del banco
app.use("/v1/users", usersRoutes_1.default); // Ruta para las operaciones de los usuarios
// Exportar la aplicación Express
exports.default = app;
