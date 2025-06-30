import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const PaymentBook = sequelize.define('payment_book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false }
});
