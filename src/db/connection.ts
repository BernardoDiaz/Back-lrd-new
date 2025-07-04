import {Sequelize} from "sequelize";
import { user } from '../models/usersModels/user';
import bcrypt from 'bcrypt';

// const sequelize = new Sequelize('proyectlrd2','root','root123456',{
//     host: 'localhost',
//     dialect: 'mysql'
// }); 

const sequelize = new Sequelize('proyectlrd','vmtest','ed|6vB{4Yn}F5gA4',{
    host: 'localhost',
    dialect: 'mysql'
}); 

// Crear usuario por defecto si no existe ninguno
afterDbSync();

async function afterDbSync() {
    try {
        await sequelize.sync();
        const userCount = await user.count();
        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await user.create({
                username: 'admin',
                password: hashedPassword,
                rol: 'Administrador',
                state: true
            });
            console.log('Usuario por defecto creado: admin / admin123');
        }
    } catch (error) {
        console.error('Error creando usuario por defecto:', error);
    }
}

export default sequelize;