import faker from 'faker';
import Product from '../models/products.models.js';

export const generateMockProducts = async (req, res) => {
    try {
        for (let i = 0; i < 20; i++) {
            const productData = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.datatype.number({ min: 10, max: 100 }),
                category: faker.commerce.department(),
                status: true,
                code: faker.random.alphaNumeric(10),
                thumbnails: [faker.image.imageUrl()]
            };
            
            const newProduct = await Product.create(productData);
        }
        res.json({ message: 'Productos de prueba creados exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};