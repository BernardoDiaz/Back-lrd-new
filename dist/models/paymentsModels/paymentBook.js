"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBook = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.PaymentBook = connection_1.default.define('payment_book', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
