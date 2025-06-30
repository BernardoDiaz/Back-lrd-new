import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

 export const user = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true 
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});