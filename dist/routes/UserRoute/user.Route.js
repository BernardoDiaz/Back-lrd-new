"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../../controllers/UserControllers/User.Controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
// Registro de usuario: solo roles permitidos
router.post('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), User_Controller_1.newUser);
// Login: público
router.post('/login', User_Controller_1.loginUser);
// Obtener todos los usuarios: solo roles permitidos
router.get('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), User_Controller_1.getUsers);
// Obtener usuario por id: solo roles permitidos
router.get('/by/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), User_Controller_1.getUserById);
// Actualizar usuario: solo roles permitidos
router.put('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), User_Controller_1.updateUser);
// Eliminar usuario: solo roles permitidos
router.delete('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), User_Controller_1.deleteUser);
exports.default = router;
