import { Router } from 'express';
import { createReceipt, listReceipts, updateReceiptStatus, getReceiptById, getNextReceiptNumber } from '../../controllers/PaymentsControllers/PaymentReceipt.Controller';

const router = Router();

router.get('/next-number', getNextReceiptNumber);
router.post('/', createReceipt);
router.get('/', listReceipts);
router.patch('/:id/status', updateReceiptStatus);
router.get('/:id', getReceiptById);

export default router;
