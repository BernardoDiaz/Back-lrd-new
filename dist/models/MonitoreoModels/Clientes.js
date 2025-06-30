"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Clientes = connection_1.default.define('clientes', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    empresa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    contacto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    telefonoFijo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
