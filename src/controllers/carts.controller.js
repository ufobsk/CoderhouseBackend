import Cart from '../models/carts.models.js';
import Ticket from "../models/ticket.models.js";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const discount = parseFloat(process.env.DISCOUNT);

export const createCart = async (req, res) => {
    try {
        const newCart = await Cart.create({ products: [] });
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Los administradores no pueden agregar productos al carrito.' });
        }

        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const cart = await Cart.findById(cartId);

        const existingProductIndex = cart.products.findIndex(product => product.id_prod.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({
                id_prod: productId,
                quantity: quantity,
            });
        }

        const updatedCart = await cart.save();

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.findById(cartId).populate({
            path: 'products.id_prod',
            model: 'products'
        });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.findById(cartId).populate({
            path: 'products.id_prod',
            model: 'products'
        });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito sin productos encontrados' });
        }

        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Los administradores no pueden actualizar productos al carrito.' });
        }
        const cartId = req.params.cid;
        const updatedCartData = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { $set: updatedCartData },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductQuantityInCart = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Los administradores no pueden actualizar productos al carrito.' });
        }

        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId, "products.id_prod": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Los administradores no pueden eliminar productos del carrito.' });
        }

        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $pull: {
                    products: { id_prod: productId },
                },
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { products: [] },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const purchaseCart = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId)
        .populate('products.id_prod')
        .exec();

    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado.' });
    }

    let totalAmount = 0;
    const productsFailed = [];
    let newTicket = {};

    for (const cartProduct of cart.products) {
        const product = cartProduct.id_prod;

        if (cartProduct.quantity <= product.stock) {
            product.stock -= cartProduct.quantity;
            totalAmount += product.price * cartProduct.quantity;
            await product.save();
            cart.products.pull({ _id: cartProduct._id });
        } else {
            productsFailed.push(product);
            cart.products.pull({ _id: cartProduct._id });
        }
    }
    await cart.save();

    if (totalAmount > 0) {
        const code = 'TCKT-' + uuidv4();
        const purchaser = req.user.email;

        let finalAmount = totalAmount;
        if (req.user.role === 'premium') {
          finalAmount = totalAmount * discount; 
        }

        const newTicket = new Ticket({
            code: code,
            amount: finalAmount,
            purchaser: purchaser
        });

        await newTicket.save();
    }

    await cart.save();

    res.json({ message: 'Compra finalizada.', ticket: newTicket, productsFailed });
}

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const deletedCart = await Cart.findByIdAndDelete(cartId);

        if (!deletedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json({ message: 'Carrito eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};