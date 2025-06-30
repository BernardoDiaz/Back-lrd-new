"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Enrollment = connection_1.default.define('enrollment', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    montoTotal: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    montoPagado: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    saldo: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
