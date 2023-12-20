import express from 'express';
import {
    createCart,
    addProductToCart,
    getCartById,
    getProductsInCart,
    updateProductQuantityInCart,
    deleteProductFromCart,
    clearCart,
    updateCart,
    purchaseCart,
    deleteCart
} from '../controllers/cartController.js';
import { isAuthenticated } from '../controllers/authController.js';   

const router = express.Router();

router.post('/', createCart);
router.post('/:cid/products/:pid', isAuthenticated, addProductToCart);
router.get('/:cid', getCartById);
router.get('/:cid/products', getProductsInCart);
router.put('/:cid', isAuthenticated, updateCart);
router.put('/:cid/products/:pid', isAuthenticated, updateProductQuantityInCart);
router.delete('/:cid/products/:pid', isAuthenticated, deleteProductFromCart);
router.delete('/:cid', isAuthenticated, clearCart);
router.delete('/:cid/delete', isAuthenticated, deleteCart);
router.post('/:cid/purchase', isAuthenticated, purchaseCart);

export default router;