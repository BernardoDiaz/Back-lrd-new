import { Router } from 'express';
import { createPayment, getPaymentsByStudent, getCurrentYearFeesByStudent, getFeesByStudentId } from '../../controllers/PaymentsControllers/Payments.Controller';

const router = Router();

router.post('/', createPayment);
router.get('/student/:studentId', getPaymentsByStudent);
router.get('/student/:studentId/fees/current', getCurrentYearFeesByStudent);
router.get('/student/:studentId/fees', getFeesByStudentId);

export default router;
