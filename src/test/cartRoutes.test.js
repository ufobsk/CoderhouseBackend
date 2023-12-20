import { describe, it, before, after } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const requester = supertest('http://localhost:8080');

describe('Testing del carrito en Tienda Online', function () {
    let cookie;
    let cartId;

    before(async function () {
        const userCredentials = {
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD,
        };

        const response = await requester.post('/users/api/login').send(userCredentials);
        cookie = response.headers['set-cookie'];

        const cartResponse = await requester.post('/api/carts')
            .set("Cookie", cookie);
        cartId = cartResponse.body._id;
    });

    describe('Prueba de creación de carrito', function () {
        it('POST /api/carts, se espera crear un nuevo carrito', async function () {
            try {
                const response = await requester.get(`/api/carts/${cartId}`)
                    .set("Cookie", cookie);
                expect(response.body.products).to.be.empty;
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });

    describe('Prueba de agregar producto al carrito', function () {
        it('POST /api/carts/:cid/products/:pid, se espera agregar un producto al carrito', async function () {
            try {
                const productId = '6570af827c822e4e0d634864'; 
                const response = await requester.post(`/api/carts/${cartId}/products/${productId}`)
                    .set("Cookie", cookie)
                    .send({
                        quantity: 1
                    });
                expect(response.body.products).to.have.length(1);
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });

    describe('Prueba de compra del carrito', function () {
        it('POST /api/carts/:cid/purchase, se espera comprar el carrito', async function () {
            try {
                const response = await requester.post(`/api/carts/${cartId}/purchase`)
                    .set("Cookie", cookie);
                expect(response.body.message).to.equal('Compra finalizada.');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });

    after(async function () {
        await requester.delete(`/api/carts/${cartId}/delete`)
            .set("Cookie", cookie);
    });
});