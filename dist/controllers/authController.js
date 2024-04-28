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
exports.login = exports.register = void 0;
const password_service_1 = require("../services/password.service");
const user_prisma_1 = __importDefault(require("../models/user.prisma"));
const auth_service_1 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { username, name, email, password } = req.body;
    try {
        if (!username) {
            res.status(400).json({ message: "Username is required" });
            return;
        }
        if (!name) {
            res.status(400).json({ message: "Name is required" });
            return;
        }
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        if (!password) {
            res.status(400).json({ message: "Password is required" });
            return;
        }
        const hashedPassword = yield (0, password_service_1.hashPassword)(password);
        console.log(hashedPassword);
        const user = yield user_prisma_1.default.create({
            data: {
                username,
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, auth_service_1.generateToken)(user);
        res.status(201).json({ token });
    }
    catch (error) {
        console.error("Registration error:", error);
        let statusCode = 500;
        let errorMessage = "There was an error in the register";
        // Verifica si el error es debido a un correo electrónico duplicado
        if ((error === null || error === void 0 ? void 0 : error.code) === "P2002" && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes("email"))) {
            statusCode = 400;
            errorMessage = "The email entered already exists.";
        }
        // Enviar respuesta con el código de estado y mensaje adecuados
        res.status(statusCode).json({ error: errorMessage });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email) {
            res.status(400).json({ message: "The email is required." });
            return;
        }
        if (!password) {
            res.status(400).json({ message: "The password is required" });
        }
        const user = yield user_prisma_1.default.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        const passwordMatch = yield (0, password_service_1.comparePassword)(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                error: "Username and passwords do not match",
            });
            return;
        }
        const token = (0, auth_service_1.generateToken)(user);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log("error: ", error);
    }
});
exports.login = login;
