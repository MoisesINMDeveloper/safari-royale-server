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
const client_1 = require("@prisma/client");
const bank_prisma_1 = __importDefault(require("../models/bank.prisma"));
const auth_service_1 = require("../services/auth.service"); // Importa la función para generar tokens
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, name, email, dni, password, bank, phone, verified } = req.body;
        if (!username ||
            !name ||
            !email ||
            !password ||
            !dni ||
            !verified ||
            !bank ||
            !phone) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const hashedPassword = yield (0, password_service_1.hashPassword)(password);
        const idBank = yield bank_prisma_1.default.findUnique({
            where: {
                id: bank,
            },
        });
        const user = yield prisma.user.create({
            data: {
                username,
                name,
                email,
                password: hashedPassword,
                dni,
                verified,
                bank: {
                    connect: {
                        id: idBank === null || idBank === void 0 ? void 0 : idBank.id,
                    },
                },
                phone,
            },
        });
        // Genera el token
        const token = (0, auth_service_1.generateToken)(user);
        // Agrega el token a la respuesta
        res.status(201).json(Object.assign(Object.assign({}, user), { token }));
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
});
exports.createUser = createUser;
// El resto de tus controladores aquí...
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        const usersWithoutPassword = users.map((user) => (Object.assign(Object.assign({}, user), { token: user.verified ? (0, auth_service_1.generateToken)(user) : undefined, password: undefined })));
        res.status(200).json(usersWithoutPassword);
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
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userWithoutPassword = Object.assign(Object.assign({}, user), { token: user.verified ? (0, auth_service_1.generateToken)(user) : undefined, password: undefined });
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error try later." });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = parseInt(req.params.id);
    const { username, email, password, dni, bankId, phoneId, verified } = req.body;
    try {
        let dataToUpdate = {}; // Objeto para almacenar los datos a actualizar
        // Verificar y actualizar el nombre de usuario
        if (username) {
            dataToUpdate.username = username;
        }
        // Verificar y actualizar el correo electrónico
        if (email) {
            dataToUpdate.email = email;
        }
        // Verificar y actualizar la contraseña
        if (password) {
            const hashedPassword = yield (0, password_service_1.hashPassword)(password);
            dataToUpdate.password = hashedPassword;
        }
        // Verificar y actualizar el número de identificación (dni)
        if (dni) {
            dataToUpdate.dni = dni;
        }
        // Verificar y actualizar el ID del banco
        if (bankId) {
            dataToUpdate.bankId = bankId;
        }
        // Verificar y actualizar el ID del teléfono
        if (phoneId) {
            dataToUpdate.phoneId = phoneId;
        }
        // Verificar y actualizar el estado de verificación
        if (verified !== undefined) {
            dataToUpdate.verified = verified;
        }
        // Actualizar los datos del usuario utilizando Prisma
        const updatedUser = yield prisma.user.update({
            where: { id: userId }, // Especificar el usuario que se actualizará
            data: dataToUpdate, // Pasar los datos a actualizar
        });
        // Responder con el usuario actualizado
        res.status(200).json(updatedUser);
    }
    catch (error) {
        // Manejar errores
        if ((error === null || error === void 0 ? void 0 : error.code) === "P2002" && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes("email"))) {
            res.status(400).json({ error: "The email entered already exists" });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === "P2025") {
            res.status(404).json("User not found");
        }
        else {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "There was an error, try later" });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        yield prisma.user.delete({ where: { id: userId } });
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
