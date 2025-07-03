import { Router } from 'express';
import { createFeeConfig, getAllFeeConfigs, getFeeConfigById, updateFeeConfig, deleteFeeConfig } from '../../controllers/PaymentsControllers/FeeConfig.Controller';
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), createFeeConfig);
router.get('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getAllFeeConfigs);
router.get('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getFeeConfigById);
router.put('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), updateFeeConfig);
router.delete('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), deleteFeeConfig);

export default router;
