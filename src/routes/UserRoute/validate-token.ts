import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
 
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('valido');
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token si entra
        try {
            //corte de token firmado por nuestro servidor
            const bearerToken = headerToken.slice(7);
            const secret = process.env.SECRET_KEY;
            if (!secret) throw new Error('SECRET_KEY no definida en variables de entorno');
            Jwt.verify(bearerToken, secret);

            next();

        } catch (error) {
            res.status(401).json({
                msg: `Token no valido`
            })
        }

    } else {
        res.status(400).json({
            msg: `Acceso denegado`
        })
    }
};

export default validateToken;