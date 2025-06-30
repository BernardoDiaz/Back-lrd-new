"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quote = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const company_1 = require("../CompanyModels/company");
exports.quote = connection_1.default.define('quotes', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    concept: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.quote.belongsTo(company_1.company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});
