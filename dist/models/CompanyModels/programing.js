"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.programing = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.programing = connection_1.default.define('programings', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    programingActivity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    programingDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    programingTimeStart: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    programingTimeEnd: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    programingDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    //para enlaces o ubicaciones de la actividad
    programingLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    //para el saber que usuario creo la actividad
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
