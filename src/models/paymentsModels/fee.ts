import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Fee = sequelize.define('fee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    paymentBookId: { type: DataTypes.INTEGER, allowNull: false },
    studentId: { type: DataTypes.STRING, allowNull: true },
    mes: { type: DataTypes.STRING, allowNull: false },
    monto: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    pagado: { type: DataTypes.BOOLEAN, defaultValue: false },
    fechaPago: { type: DataTypes.DATE },
    year: { type: DataTypes.INTEGER, allowNull: false } // Nuevo campo para año
});
