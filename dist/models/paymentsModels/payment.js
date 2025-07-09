"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Payment = connection_1.default.define('payment', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    concepto: { type: sequelize_1.DataTypes.ENUM('cuota', 'matricula', 'producto', 'mixto'), allowNull: false },
    feeId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    enrollmentId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    productId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    monto: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    descuento: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: true, defaultValue: 0 },
    montoReal: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    fecha: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    metodoPago: { type: sequelize_1.DataTypes.ENUM('efectivo', 'tarjeta'), allowNull: false, defaultValue: 'efectivo' },
    bancoDestino: { type: sequelize_1.DataTypes.STRING, allowNull: true },
});
