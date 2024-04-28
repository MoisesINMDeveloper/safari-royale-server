"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autenticateToken_1 = __importDefault(require("../middleware/autenticateToken"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/", autenticateToken_1.default, userController_1.createUser);
router.get("/", autenticateToken_1.default, userController_1.getAllUsers);
router.get("/:id", autenticateToken_1.default, userController_1.getUserById);
router.put("/:id", autenticateToken_1.default, userController_1.updateUser);
router.delete("/:id", autenticateToken_1.default, userController_1.deleteUser);
exports.default = router;
