import { Router } from 'express';
import { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../../controllers/ProductsControllers/ProductCategory.Controller';

const router = Router();

router.post('/', createProductCategory);
router.get('/', getAllProductCategories);
router.get('/:id', getProductCategoryById);
router.put('/:id', updateProductCategory);
router.delete('/:id', deleteProductCategory);

export default router;
