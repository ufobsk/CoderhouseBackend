import Product from '../models/products.models.js';
import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enums.js';
import { generateProductErrorInfo } from '../services/errors/info.js';
import Logger from '../services/logger.js'

export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, query } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
        };
        const filter = {};

        if (query && query === 'category') {
            const categoryName = req.query.categoryName;
            if (categoryName) {
                filter.category = categoryName;
            }
        }

        const result = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validateProductData = (product) => {
    const camposRequeridos = ['title', 'price', 'category'];

    for (let campo of camposRequeridos) {
        if (!product[campo]) {
            throw CustomError.createError({
                name: EErrors.MISSING_REQUIRED_FIELDS.name,
                message: generateProductErrorInfo(product),
                code: EErrors.MISSING_REQUIRED_FIELDS.code,
            });
        }
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        validateProductData(productData);
        const newProduct = await Product.create(productData);
        res.json(newProduct);
    } catch (error) {
        next(error); 
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedFields = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedFields,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).send("Producto eliminado correctamente.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const renderProducts = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };
        const result = await Product.paginate({}, options);

        res.render('index', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) {
        Logger.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};