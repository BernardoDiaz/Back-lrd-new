import { Router } from 'express';
import { createAspirant, getAllStudents, getStudentById, updateStudent, 
    deleteStudent, promoteToStudent, getStudentFees, getStudentEnrollment, 
    checkStudentIdExists, checkStudentEmailExists, 
    getNextStudentIdSimple} from '../../controllers/StudentControllers/Student.Controller';

const router = Router();

router.post('/', createAspirant);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:studentId', deleteStudent);
router.post('/promote/:studentId', promoteToStudent);
router.get('/:id/fees', getStudentFees);
router.get('/:id/enrollment', getStudentEnrollment);
router.get('/check-id/:id', checkStudentIdExists);
router.get('/check-email/:email', checkStudentEmailExists);
router.get('/generate-next-id/:baseId', getNextStudentIdSimple);

export default router;
