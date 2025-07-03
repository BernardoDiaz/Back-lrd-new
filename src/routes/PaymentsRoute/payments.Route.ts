import { Router } from 'express';
import { createPayment, getPaymentsByStudent, getCurrentYearFeesByStudent, getFeesByStudentId, registerMixedPayment } from '../../controllers/PaymentsControllers/Payments.Controller';
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), createPayment);
router.post('/mixed', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), registerMixedPayment);
router.get('/student/:studentId', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getPaymentsByStudent);
router.get('/student/:studentId/fees/current', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getCurrentYearFeesByStudent);
router.get('/student/:studentId/fees', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getFeesByStudentId);

export default router;
