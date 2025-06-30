"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteDetails = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const quote_1 = require("./quote");
exports.quoteDetails = connection_1.default.define('quoteDetails', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    quoteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    product: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
});
exports.quoteDetails.belongsTo(quote_1.quote, {
    foreignKey: 'quoteId',
    targetKey: 'id'
});
