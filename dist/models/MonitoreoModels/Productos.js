"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Categorias_1 = require("./Categorias");
exports.Productos = connection_1.default.define('productos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
});
exports.Productos.belongsTo(Categorias_1.Categorias, {
    foreignKey: 'idCategoria',
    as: 'categoria',
    onDelete: 'RESTRICT'
});
Categorias_1.Categorias.hasMany(exports.Productos, {
    foreignKey: 'idCategoria',
    as: 'productos',
    onDelete: 'RESTRICT'
});
