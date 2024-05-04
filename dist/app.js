"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankRoutes_1 = __importDefault(require("./routes/bankRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configurar CORS en cada ruta
const corsOptions = {
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir varios métodos HTTP
    allowedHeaders: "Content-Type, Accept", // Permitir ciertos encabezados
};
// Routes
app.use("/api/v1/auth", (0, cors_1.default)(corsOptions), authRoutes_1.default);
app.use("/api/v1/", (0, cors_1.default)(corsOptions), phoneRoutes_1.default);
app.use("/api/v1/", (0, cors_1.default)(corsOptions), bankRoutes_1.default);
app.use("/api/v1/users", (0, cors_1.default)(corsOptions), usersRoutes_1.default);
// Construir api rest para user
exports.default = app;
