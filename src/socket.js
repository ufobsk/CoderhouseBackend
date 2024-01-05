import productModel from './models/products.models.js';
import Logger from './services/logger.js';

const setupSockets = (io) => {
    io.on('connection', (socket) => {
        Logger.info('Cliente conectado')

        socket.on('createProduct', async (productData) => {
            try {
                const newProduct = await productModel.create(productData);
                io.emit('productCreated', newProduct);
            } catch (error) {
                Logger.error("Error al crear el producto: " + error);
            }
        });

        socket.on('deleteProduct', async (productId) => {
            try {
                await productModel.findByIdAndDelete(productId);
                io.emit('productDeleted', productId);
            } catch (error) {
                Logger.error("Error al eliminar el producto:", + error);
            }
        });

        socket.on('updateProduct', async (updatedProductData) => {
            try {
                const { productId, updatedFields } = updatedProductData;
                const updatedProduct = await productModel.findByIdAndUpdate(
                    productId,
                    updatedFields,
                    { new: true }
                );
                io.emit('productUpdated', updatedProduct);
            } catch (error) {
                Logger.error("Error al actualizar el producto: " + error);
            }
        });
    });
};

export default setupSockets;