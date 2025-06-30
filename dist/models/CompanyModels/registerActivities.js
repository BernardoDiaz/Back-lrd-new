"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerActivities = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const company_1 = require("./company");
exports.registerActivities = connection_1.default.define('registerActivities', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    activityType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    activityDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    activityDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports.registerActivities.belongsTo(company_1.company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});
