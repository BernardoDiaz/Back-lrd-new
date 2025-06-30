import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const FeeConfig = sequelize.define('fee_config', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nivel: { type: DataTypes.STRING, allowNull: false }, // Ej: inicial, parvularia, primer ciclo, etc.
    montoCuota: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    montoMatricula: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});
