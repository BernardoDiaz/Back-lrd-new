import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyectlrd2','root','root123456',{
    host: 'localhost',
    dialect: 'mysql'
}); 

// const sequelize = new Sequelize('seguimiento_clientes2','bernardo','test123',{
//     host: 'localhost',
//     dialect: 'mysql'
// }); 

export default sequelize;