"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Fee = connection_1.default.define('fee', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    paymentBookId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    studentId: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    mes: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    monto: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    pagado: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    fechaPago: { type: sequelize_1.DataTypes.DATE },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: false } // Nuevo campo para año
});
