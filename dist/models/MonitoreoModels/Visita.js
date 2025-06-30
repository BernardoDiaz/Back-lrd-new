"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Clientes_1 = require("./Clientes");
exports.Visitas = connection_1.default.define('visitas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    asunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    hora: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    objetivo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.Visitas.belongsTo(Clientes_1.Clientes, {
    foreignKey: 'idCliente',
    as: 'cliente'
});
Clientes_1.Clientes.hasMany(exports.Visitas, {
    foreignKey: 'idCliente',
    as: 'visitas'
});
