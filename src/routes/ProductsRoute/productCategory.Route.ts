import { Router } from 'express';
import { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../../controllers/ProductsControllers/ProductCategory.Controller';
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

router.post('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), createProductCategory);
router.get('/', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getAllProductCategories);
router.get('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), getProductCategoryById);
router.put('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), updateProductCategory);
router.delete('/:id', validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudian'), deleteProductCategory);

export default router;
