import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../../controllers/ProductsControllers/Product.Controller';
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), createProduct);
router.get('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getAllProducts);
router.get('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getProductById);
router.put('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), updateProduct);
router.delete('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), deleteProduct);

export default router;
