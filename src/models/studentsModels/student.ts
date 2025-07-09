import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentID: { type: DataTypes.STRING, allowNull: true, unique: true },
    nombres: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: true },
    telefono: { type: DataTypes.STRING, allowNull: true },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: true },
    direccion: { type: DataTypes.STRING, allowNull: true },
    matricula: { type: DataTypes.STRING, allowNull: false, unique: true },
    nivel: { type: DataTypes.STRING, allowNull: false },
    grado: { type: DataTypes.STRING, allowNull: false },
    nombreContactoEmergencia: { type: DataTypes.STRING, allowNull: true },
    telefonoContactoEmergencia: { type: DataTypes.STRING, allowNull: true },
    tipo: { type: DataTypes.ENUM('aspirante', 'estudiante'), defaultValue: 'aspirante' },
    estado: { type: DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' },
    year: { type: DataTypes.INTEGER, allowNull: false }
    // ...otros campos necesarios
});
