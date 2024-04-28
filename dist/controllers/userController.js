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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const password_service_1 = require("../services/password.service");
const user_prisma_1 = __importDefault(require("../models/user.prisma"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { username, name, email, password } = req.body;
        if (!username) {
            res.status(400).json({ message: "The username is required" });
            return;
        }
        if (!name) {
            res.status(400).json({ message: "The name is required" });
            return;
        }
        if (!email) {
            res.status(400).json({ message: "The email is required" });
            return;
        }
        if (!password) {
            res.status(400).json({ message: "The password is required" });
            return;
        }
        const hashedPassword = yield (0, password_service_1.hashPassword)(password);
        const user = yield user_prisma_1.default.create({
            data: {
                username,
                name,
                email,
                password,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error try again later: ", error);
        let statusCode = 500;
        let errorMessage = "There was an error try later";
        // Verifica si el error es debido a un correo electrónico duplicado
        if ((error === null || error === void 0 ? void 0 : error.code) === "P2002" && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes("email"))) {
            statusCode = 400;
            errorMessage = "El email ingresado ya existe.";
        }
        // Enviar respuesta con el código de estado y mensaje adecuados
        res.status(statusCode).json({ error: errorMessage });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_prisma_1.default.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error try later." });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield user_prisma_1.default.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error try later." });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = parseInt(req.params.id);
    const { username, name, email, password } = req.body;
    try {
        let dataToUpdate = Object.assign({}, req.body);
        if (username) {
            dataToUpdate.username = username;
        }
        if (name) {
            dataToUpdate.name = name;
        }
        if (email) {
            dataToUpdate.email = email;
        }
        if (password) {
            const hashedPassword = yield (0, password_service_1.hashPassword)(password);
            dataToUpdate.password = hashedPassword;
        }
        const user = yield user_prisma_1.default.update({
            where: {
                id: userId,
            },
            data: dataToUpdate,
        });
        res.status(200).json(user);
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "P2002" && ((_d = (_c = error === null || error === void 0 ? void 0 : error.meta) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.includes("email"))) {
            res.status(400).json({ error: "The email entered already exists" });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === "P2025") {
            res.status(404).json("User not found");
        }
        else {
            console.log(error);
            res.status(500).json({ error: "There was an error, try later" });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        yield user_prisma_1.default.delete({ where: { id: userId } });
        res.status(200).json({ message: `The user ${userId} has been deleted` });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "P2025") {
            res.status(404).json("User not found");
        }
        else {
            console.log(error);
            res.status(500).json({
                error: "There was an error, try later",
            });
        }
    }
});
exports.deleteUser = deleteUser;
