"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankRoutes_1 = __importDefault(require("./routes/bankRoutes"));
const combinationRoutes_1 = __importDefault(require("./routes/combinationRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const animalRoutes_1 = __importDefault(require("./routes/animalRoutes"));
const colorsRoutes_1 = __importDefault(require("./routes/colorsRoutes"));
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
const autenticateToken_1 = __importDefault(require("./middleware/autenticateToken"));
const getDataUserRoutes_1 = __importDefault(require("./routes/getDataUserRoutes"));
const raffleRoutes_1 = __importDefault(require("./routes/raffleRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Habilitar CORS para todas las rutas
app.use(express_1.default.json());
// Middleware para manejar las solicitudes OPTIONS (preflight)
app.options("*", (0, cors_1.default)());
// Rutas
app.use("/v1/animals", (0, autenticateToken_1.default)("ADMIN"), animalRoutes_1.default);
app.use("/v1/colors", (0, autenticateToken_1.default)("ADMIN"), colorsRoutes_1.default);
app.use("/v1/phones", (0, autenticateToken_1.default)("ADMIN"), phoneRoutes_1.default); // Ruta para las operaciones del teléfono
app.use("/v1/banks", (0, autenticateToken_1.default)("ADMIN"), bankRoutes_1.default); // Ruta para las operaciones del banco
app.use("/v1/raffles", (0, autenticateToken_1.default)("ADMIN"), raffleRoutes_1.default);
app.use("/v1/auth", authRoutes_1.default); // Ruta para la autenticación
app.use("/v1/tickets", (0, autenticateToken_1.default)(), ticketRoutes_1.default);
app.use("/v1/combinations", (0, autenticateToken_1.default)(), combinationRoutes_1.default);
app.use("/v1/users", usersRoutes_1.default); // Ruta para las operaciones de los usuarios
app.use("/v1/auth", (0, autenticateToken_1.default)(), getDataUserRoutes_1.default);
// Exportar la aplicación Express
exports.default = app;
