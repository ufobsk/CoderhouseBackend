import { describe, it } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const requester = supertest('http://localhost:8080');

describe('Testing de usuarios en Tienda Online', function () {
    describe('Prueba de registro de usuario', function () {
        it('POST /users/api/register, se espera registrar un nuevo usuario', async function () {
            const uniqueEmail = `testuser${Date.now()}@test.com`;
            try {
                const response = await requester.post('/users/api/register')
                    .send({
                        first_name: "Test",
                        last_name: "User",
                        email: uniqueEmail,
                        password: "testpassword",
                        age: 30
                    });
                expect(response.body.message).to.equal('Usuario creado correctamente');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });

    describe('Prueba de inicio de sesión', function () {
        it('POST /users/api/login, se espera iniciar sesión con usuario registrado', async function () {
            try {
                const response = await requester.post('/users/api/login')
                    .send({
                        email: process.env.TEST_USER_EMAIL,
                        password: process.env.TEST_USER_PASSWORD,
                    });
                    console.log(response.body)
                expect(response.body.message).to.equal('Inicio de sesión exitoso');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });

    describe('Prueba de cierre de sesión', function () {
        it('GET /users/api/logout, se espera cerrar sesión con usuario registrado', async function () {
            try {
                const response = await requester.get('/users/api/logout');
                expect(response.body.message).to.equal('Sesión cerrada con éxito');
            } catch (error) {
                console.error("ERROR: ", error);
                throw error;
            }
        });
    });
});