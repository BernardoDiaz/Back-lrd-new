import { Router } from 'express';
import { createFeeConfig, getAllFeeConfigs, getFeeConfigById, updateFeeConfig, deleteFeeConfig } from '../../controllers/PaymentsControllers/FeeConfig.Controller';

const router = Router();

router.post('/', createFeeConfig);
router.get('/', getAllFeeConfigs);
router.get('/:id', getFeeConfigById);
router.put('/:id', updateFeeConfig);
router.delete('/:id', deleteFeeConfig);

export default router;
