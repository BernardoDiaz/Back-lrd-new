import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Payment = sequelize.define('payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.STRING, allowNull: false },
    concepto: { type: DataTypes.ENUM('cuota', 'matricula', 'producto', 'mixto'), allowNull: false },
    feeId: { type: DataTypes.INTEGER, allowNull: true }, // cuota
    enrollmentId: { type: DataTypes.INTEGER, allowNull: true }, // matrícula
    productId: { type: DataTypes.INTEGER, allowNull: true }, // producto
    monto: { type: DataTypes.DECIMAL(10,2), allowNull: false }, // monto original
    descuento: { type: DataTypes.DECIMAL(10,2), allowNull: true, defaultValue: 0 }, // descuento aplicado
    montoReal: { type: DataTypes.DECIMAL(10,2), allowNull: false }, // monto final (monto - descuento)
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});