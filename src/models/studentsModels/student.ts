import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentID: { type: DataTypes.STRING, allowNull: false, unique: true },
    nombres: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    matricula: { type: DataTypes.STRING, allowNull: false, unique: true },
    nivel: { type: DataTypes.STRING, allowNull: false },
    grado: { type: DataTypes.STRING, allowNull: false },
    nombreContactoEmergencia: { type: DataTypes.STRING, allowNull: false },
    telefonoContactoEmergencia: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.ENUM('aspirante', 'estudiante'), defaultValue: 'aspirante' },
    estado: { type: DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' }
    // ...otros campos necesarios
});
 