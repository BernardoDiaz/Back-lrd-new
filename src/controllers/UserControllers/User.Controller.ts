import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { user } from "../../models/usersModels/user";
import Jwt from "jsonwebtoken";

//Metodo para crear nuevo usuario
export const newUser = async (req: Request, res: Response) => {

    const { username, password, rol } = req.body;

    //Validacion de usuario
    const uservalid = await user.findOne({ where: { username: username } });

    if (uservalid) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    //Encriptacion de la password
    const hastpassword = await bcrypt.hash(password, 10);

    try {
        //Guardando usuario en base de datos
        await user.create({
            username: username,
            password: hastpassword,
            rol: rol
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente con el rol de ${rol}`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};
//Metodo de loggin para usuarios y generacion de token
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    //validar si el usuario existe en bd
    const uservalidlog: any = await user.findOne({ where: { username: username } });
    //Verificar si el usuario está activado
    const userActivate: any = await user.findOne({ where: { username:username,state: 1 } });

    //Si el user no existe
    if (!uservalidlog) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} registrado`
        });
    }

    if (!userActivate) {
        return res.status(400).json({
            msg: `Cuenta Inactiva. Comunicate con soporte IT`
        });
    }
    
    //Validamos password
    const passwordvalid = await bcrypt.compare(password, uservalidlog.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: `Tu contraseña no es correcta, intenta nuevamente`
        })
    }
    // Generación de token jwt con el campo rol
    const token = Jwt.sign({
        id: uservalidlog.id,
        username: uservalidlog.username,
        rol: uservalidlog.rol // Incluimos el campo rol en el payload
    }, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F');

    // Respuesta con la estructura solicitada
    res.json({
        token: token,
        user: {
            id: uservalidlog.id,
            username: uservalidlog.username,
            rol: uservalidlog.rol
        }
    });
};

export const getUsers = async (req: Request, res: Response) => {
    //Generamos la lista
    const listU = await user.findAll({ attributes: ['id', 'username', 'rol'] });

    //Devolvemos la respuesta via JSON
    // Si quieres que el frontend reciba siempre 'rol' y no 'role', no hay que cambiar nada aquí porque ya es 'rol'
    res.json(listU);
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Incluimos el campo 'rol' en la respuesta
        const userbyId = await user.findByPk(id,{attributes:['id','username','rol']});
        if (!userbyId) {
            return res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
        res.json(userbyId);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await user.findOne({ where: { id: id } });

    try {
        if (one) {
            await user.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El grado ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar, si hay una vinculacion, no te sera posible eliminarlo comunicate con el encargado de IT para verificar la situacion`,
            error
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, rol } = req.body;

    const one = await user.findOne({ where: { id: id } });

    try {
        if (one) {
            await user.update({ username, rol }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};