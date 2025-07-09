import { Router } from 'express';
import { createReceipt, listReceipts, updateReceiptStatus, getReceiptById } from '../../controllers/PaymentsControllers/PaymentReceipt.Controller';

const router = Router();

router.post('/', createReceipt);
router.get('/', listReceipts);
router.patch('/:id/status', updateReceiptStatus);
router.get('/:id', getReceiptById);

export default router;
