import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const requester = supertest('http://localhost:8080');

describe('Testing de productos en Tienda Online', function () {
    let adminToken;
    let cookie;

    before(async function () {
        const adminCredentials = {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        };

        const response = await requester.post('/users/api/login').send(adminCredentials);
        console.log(response.body)
        cookie = response.headers['set-cookie'];
        console.log(cookie);
        adminToken = response.body.token;
    });

    describe('Prueba de creación de producto', function () {
        it('POST /api/products, se espera crear un nuevo producto', async function () {
            try {
                const response = await requester.post('/api/products')
                    .set("Cookie", cookie)
                    .send({
                        "title": "Producto de prueba",
                        "description": "Descripción del producto",
                        "price": 19.99,
                        "stock": 100,
                        "category": "Electrónica",
                        "status": true,
                        "code": `PROD${Date.now()}`,
                        "thumbnails": ["url_imagen_1", "url_imagen_2"]
                    });
                console.log(response.body)
                expect(response.body.title).to.equal('Producto de prueba');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });
});