import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Enrollment = sequelize.define('enrollment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.STRING, allowNull: false },
    montoTotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    montoPagado: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    saldo: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    year: { type: DataTypes.INTEGER, allowNull: false }
});