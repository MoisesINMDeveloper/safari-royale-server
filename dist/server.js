"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const whitelist = [
    "http://localhost:3000", // Agregar dominios locales
    "http://127.0.0.1:3000",
    "https://www.google.com", // Ejemplo de dominio de buscador
    "https://www.bing.com", // Otro ejemplo de dominio de buscador
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use((0, cors_1.default)(corsOptions));
// Resto de la configuración de tu aplicación...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
