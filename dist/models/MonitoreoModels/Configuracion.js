"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuracions = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Configuracions = connection_1.default.define('Configuracions', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pais: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    yearConfiguracion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    metaEconomica: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    metaClientes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
