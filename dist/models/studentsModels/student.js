"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Student = connection_1.default.define('student', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentID: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    nombres: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellidos: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    correo: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    telefono: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    fechaNacimiento: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    direccion: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    matricula: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    nivel: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    grado: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    nombreContactoEmergencia: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    telefonoContactoEmergencia: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tipo: { type: sequelize_1.DataTypes.ENUM('aspirante', 'estudiante'), defaultValue: 'aspirante' },
    estado: { type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' }
    // ...otros campos necesarios
});
