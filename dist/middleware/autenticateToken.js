"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const prisma = new client_1.PrismaClient();
const authenticateToken = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No autorizado" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = yield prisma.user.findUnique({
                where: { id: decoded.id },
            });
            if (!user) {
                return res
                    .status(403)
                    .json({ error: "No tienes acceso a este recurso." });
            }
            if (requiredRole && user.role !== requiredRole) {
                return res
                    .status(403)
                    .json({ error: "No tienes acceso a este recurso." });
            }
            res.locals.user = user;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(403).json({ error: "El token ha expirado." });
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(403).json({ error: "Firma de token inválida." });
            }
            else {
                return res
                    .status(403)
                    .json({ error: "No tienes acceso a este recurso." });
            }
        }
    });
};
exports.default = authenticateToken;
