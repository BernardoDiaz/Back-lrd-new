import { Router } from 'express';
import { createAspirant, getAllStudents, getStudentById, updateStudent, 
    deleteStudent, promoteToStudent, getStudentFees, getStudentEnrollment, 
    checkStudentIdExists, checkStudentEmailExists, 
    getNextStudentIdSimple} from '../../controllers/StudentControllers/Student.Controller';
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

// ¡IMPORTANTE! Primero las rutas más específicas:
router.get('/next-id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getNextStudentIdSimple);
router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), createAspirant);
router.get('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getAllStudents);
router.get('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getStudentById);
router.put('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), updateStudent);
router.delete('/:studentId', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), deleteStudent);
router.post('/promote/:studentId', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), promoteToStudent);
router.get('/:id/fees', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getStudentFees);
router.get('/:id/enrollment', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getStudentEnrollment);
router.get('/check-id/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), checkStudentIdExists);
router.get('/check-email/:email', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), checkStudentEmailExists);
router.get('/generate-next-id/:baseId', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getNextStudentIdSimple);

export default router;
