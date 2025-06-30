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
exports.updateUser = exports.deleteUser = exports.getUserById = exports.getUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../models/usersModels/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Metodo para crear nuevo usuario
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, rol } = req.body;
    //Validacion de usuario
    const uservalid = yield user_1.user.findOne({ where: { username: username } });
    if (uservalid) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    //Encriptacion de la password
    const hastpassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guardando usuario en base de datos
        yield user_1.user.create({
            username: username,
            password: hastpassword,
            rol: rol
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente con el rol de ${rol}`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newUser = newUser;
//Metodo de loggin para usuarios y generacion de token
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validar si el usuario existe en bd
    const uservalidlog = yield user_1.user.findOne({ where: { username: username } });
    //Verificar si el usuario está activado
    const userActivate = yield user_1.user.findOne({ where: { username: username, state: 1 } });
    //Si el user no existe
    if (!uservalidlog) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} registrado`
        });
    }
    if (!userActivate) {
        return res.status(400).json({
            msg: `Cuenta Inactiva. Comunicate con soporte IT`
        });
    }
    //Validamos password
    const passwordvalid = yield bcrypt_1.default.compare(password, uservalidlog.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: `Tu contraseña no es correcta, intenta nuevamente`
        });
    }
    //Si todo se cumplio vamos a la Generacion de token jwt 
    const token = jsonwebtoken_1.default.sign({
        username: username,
        tdo: 'hfgdbverig'
    }, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F'); //{ expiresIn: 1800 });
    //Devolvemos el token como respuesta via JSON
    res.json(token);
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listU = yield user_1.user.findAll({ attributes: ['id', 'username', 'rol'] });
    //Devolvemos la respuesta via JSON
    res.json(listU);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const one = yield user_1.user.findOne({ attributes: ['rol'], where: { username: username, state: 1 } });
    //validacion de existencia
    try {
        if (one) {
            const myString = JSON.stringify(one).slice(8, -2);
            res.json(myString);
        }
        else {
            return res.status(404).json({
                msg: `No existe el usuario`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el usuario`
        });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield user_1.user.findOne({ where: { id: id } });
    try {
        if (one) {
            yield user_1.user.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El grado ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar, si hay una vinculacion, no te sera posible eliminarlo comunicate con el encargado de IT para verificar la situacion`,
            error
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, rol } = req.body;
    const one = yield user_1.user.findOne({ where: { id: id } });
    try {
        if (one) {
            yield user_1.user.update({ username, rol }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
});
exports.updateUser = updateUser;
