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
    studentID: { type: sequelize_1.DataTypes.STRING, allowNull: true, unique: true },
    nombres: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellidos: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    correo: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    telefono: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    fechaNacimiento: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    direccion: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    matricula: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    nivel: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    grado: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    nombreContactoEmergencia: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    telefonoContactoEmergencia: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    tipo: { type: sequelize_1.DataTypes.ENUM('aspirante', 'estudiante'), defaultValue: 'aspirante' },
    estado: { type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
    // ...otros campos necesarios
});
