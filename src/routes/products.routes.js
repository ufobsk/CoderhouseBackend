import express from 'express';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAdmin, isAuthenticated } from '../controllers/authController.js'; 
import { generateMockProducts } from '../controllers/mockingController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/mockingproducts', isAuthenticated, isAdmin, generateMockProducts);
router.get('/:pid', getProductById);
router.post('/', isAdmin, addProduct); 
router.put('/:pid', isAuthenticated, isAdmin, updateProduct);
router.delete('/:pid', isAuthenticated, isAdmin, deleteProduct);

export default router;