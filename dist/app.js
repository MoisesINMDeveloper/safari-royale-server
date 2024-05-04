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
// Routes
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/", phoneRoutes_1.default);
app.use("/api/v1/", bankRoutes_1.default);
app.use("/api/v1/users", usersRoutes_1.default);
// Construir api rest para user
exports.default = app;
