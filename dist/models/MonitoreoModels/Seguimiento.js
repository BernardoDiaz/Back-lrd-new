"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seguimientos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Seguimientos = connection_1.default.define('seguimientos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idClientes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    idNuevaVisita: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    resultadoVisita: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    comentariosVisita: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    cotizacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    numeroCotizacion: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    montoCotizacion: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    proximosPasos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estadoSeguimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
