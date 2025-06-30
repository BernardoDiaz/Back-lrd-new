"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.note = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const company_1 = require("./company");
exports.note = connection_1.default.define('notes', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    noteText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
exports.note.belongsTo(company_1.company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});
