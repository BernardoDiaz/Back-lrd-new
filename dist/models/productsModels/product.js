"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const productCategory_1 = require("./productCategory");
exports.Product = connection_1.default.define('product', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    descripcion: { type: sequelize_1.DataTypes.STRING },
    precio: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    productCategoryId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
exports.Product.belongsTo(productCategory_1.ProductCategory, { foreignKey: 'productCategoryId' });
productCategory_1.ProductCategory.hasMany(exports.Product, { foreignKey: 'productCategoryId' });
