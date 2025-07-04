"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para validar el rol del usuario
function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            console.log('Authorization header recibido:', authHeader);
            if (!authHeader) {
                console.error('No se proporcionó token de autenticación');
                return res.status(401).json({ msg: 'No se proporcionó token de autenticación' });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                console.error('Token no válido');
                return res.status(401).json({ msg: 'Token no válido' });
            }
            const secret = process.env.SECRET_KEY;
            if (!secret)
                throw new Error('SECRET_KEY no definida en variables de entorno');
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            console.log('Payload decodificado del JWT:', decoded);
            if (!decoded || !decoded.rol) {
                console.error('No autorizado: rol no encontrado en el token');
                return res.status(403).json({ msg: 'No autorizado: rol no encontrado en el token' });
            }
            // Adjuntamos el usuario decodificado al request por si se necesita después
            req.user = decoded;
            // Logs antes de la validación
            const userRol = decoded.rol;
            console.log('Rol del usuario autenticado (req.user.rol):', userRol);
            console.log('Array de roles permitidos para el endpoint:', allowedRoles);
            const match = allowedRoles.some(r => r === userRol);
            console.log('¿El rol del usuario está permitido? (comparación estricta):', match);
            if (!match) {
                console.error('No tienes permisos suficientes para realizar esta acción');
                return res.status(403).json({ msg: 'No tienes permisos suficientes para realizar esta acción' });
            }
            next();
        }
        catch (error) {
            console.error('Error en autenticación/autorización:', error.message || error);
            return res.status(401).json({ msg: 'Token inválido o expirado', error: error.message || error });
        }
    };
}
exports.authorizeRole = authorizeRole;
