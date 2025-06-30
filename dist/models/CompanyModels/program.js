"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const company_1 = require("./company");
exports.program = connection_1.default.define('programs', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    programActivity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    programDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    programTimeStart: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    programTimeEnd: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    programDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    //para enlaces o ubicaciones de la actividad
    programLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    //para el saber que empresa creo la actividad
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports.program.belongsTo(company_1.company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});
