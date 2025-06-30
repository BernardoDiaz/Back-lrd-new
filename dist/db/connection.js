"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('proyectlrd2', 'root', 'root123456', {
    host: 'localhost',
    dialect: 'mysql'
});
// const sequelize = new Sequelize('seguimiento_clientes2','bernardo','test123',{
//     host: 'localhost',
//     dialect: 'mysql'
// }); 
exports.default = sequelize;
