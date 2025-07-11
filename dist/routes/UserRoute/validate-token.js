"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    console.log('valido');
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token si entra
        try {
            //corte de token firmado por nuestro servidor
            const bearerToken = headerToken.slice(7);
            const secret = process.env.SECRET_KEY;
            if (!secret)
                throw new Error('SECRET_KEY no definida en variables de entorno');
            jsonwebtoken_1.default.verify(bearerToken, secret);
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: `Token no valido`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `Acceso denegado`
        });
    }
};
exports.default = validateToken;
