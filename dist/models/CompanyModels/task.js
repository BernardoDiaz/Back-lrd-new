"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const company_1 = require("./company");
exports.task = connection_1.default.define('tasks', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    taskStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports.task.belongsTo(company_1.company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});
