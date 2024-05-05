"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importa la función cors desde el paquete cors
const app = (0, express_1.default)();
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: "*",
    methods: "*",
    allowedHeaders: "Content-Type, Accept",
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
