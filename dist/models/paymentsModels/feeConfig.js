"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeConfig = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.FeeConfig = connection_1.default.define('fee_config', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nivel: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    montoCuota: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    montoMatricula: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false }
});
