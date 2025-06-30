import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { ProductCategory } from "./productCategory";

export const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING },
    precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    productCategoryId: { type: DataTypes.INTEGER, allowNull: false }
});

Product.belongsTo(ProductCategory, { foreignKey: 'productCategoryId' });
ProductCategory.hasMany(Product, { foreignKey: 'productCategoryId' });
