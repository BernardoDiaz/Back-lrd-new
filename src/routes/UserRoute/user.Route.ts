import {Router} from 'express';
import { deleteUser, getUserById, getUsers, loginUser,newUser, updateUser } from '../../controllers/UserControllers/User.Controller';
import validateToken from './validate-token';
 
const router = Router();

router.post('/', newUser);
router.post('/login',loginUser);
router.get('/',getUsers);
router.get('/by/:id',getUserById);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router; 