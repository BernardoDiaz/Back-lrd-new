import {Router} from 'express';
import { deleteUser, getUserById, getUsers, loginUser, newUser, updateUser } from '../../controllers/UserControllers/User.Controller';
import validateToken from './validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

// Registro de usuario: solo roles permitidos
router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), newUser);
// Login: público
router.post('/login', loginUser);
// Obtener todos los usuarios: solo roles permitidos
router.get('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getUsers);
// Obtener usuario por id: solo roles permitidos
router.get('/by/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getUserById);
// Actualizar usuario: solo roles permitidos
router.put('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), updateUser);
// Eliminar usuario: solo roles permitidos
router.delete('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), deleteUser);

export default router;