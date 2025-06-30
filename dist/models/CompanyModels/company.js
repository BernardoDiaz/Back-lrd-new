"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.company = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const user_1 = require("../usersModels/user");
exports.company = connection_1.default.define('companys', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyCountry: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    LifeStage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    TeamOwner: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    // _____________________
    companyWeb: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    companyAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    originContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.company.belongsTo(user_1.user, {
    foreignKey: 'TeamOwner',
    targetKey: 'id',
    as: 'teamOwner'
});
