"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const PaymentReceipt = connection_1.default.define('PaymentReceipt', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    paymentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'payments',
            key: 'id',
        },
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('emitido', 'cancelado', 'anulado'),
        allowNull: false,
        defaultValue: 'emitido',
    },
    issuedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    notes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    metodoPago: {
        type: sequelize_1.DataTypes.ENUM('efectivo', 'tarjeta'),
        allowNull: false,
        defaultValue: 'efectivo',
    },
    bancoDestino: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'payment_receipts',
    timestamps: false,
});
exports.default = PaymentReceipt;
