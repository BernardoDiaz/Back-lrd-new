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
const sequelize_1 = require("sequelize");
const user_1 = require("../models/usersModels/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const sequelize = new Sequelize('proyectlrd2','root','root123456',{
//     host: 'localhost',
//     dialect: 'mysql'
// }); 
const sequelize = new sequelize_1.Sequelize('proyectlrd', 'vmtest', 'ed|6vB{4Yn}F5gA4', {
    host: 'localhost',
    dialect: 'mysql'
});
// Crear usuario por defecto si no existe ninguno
afterDbSync();
function afterDbSync() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync();
            const userCount = yield user_1.user.count();
            if (userCount === 0) {
                const hashedPassword = yield bcrypt_1.default.hash('admin123', 10);
                yield user_1.user.create({
                    username: 'admin',
                    password: hashedPassword,
                    rol: 'Administrador',
                    state: true
                });
                console.log('Usuario por defecto creado: admin / admin123');
            }
        }
        catch (error) {
            console.error('Error creando usuario por defecto:', error);
        }
    });
}
exports.default = sequelize;
