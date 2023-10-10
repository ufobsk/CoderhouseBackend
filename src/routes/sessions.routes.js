import { Router } from 'express';
import userModel from '../models/users.models.js';
import passport from 'passport';

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.session.login) {
            res.status(400).send({ resultado: 'Ya estas logeado' });
        } else {
            const user = await userModel.findOne({ email: email });

            user.email === "admin@admin.com" ? req.session.userRole = "admin (admin)" : req.session.userRole = "usuario (user)";

            if (user) {
                if (user.password == password) {
                    req.session.login = true;
                    req.session.email = user.email;
                    req.status(200).send({ resultado: 'Login valido', message: user });
                } else {
                    req.status(401).send({ resultado: 'Unauthorized', message: user });
                }
            } else {
                res.status(404).send({ resultado: 'Not Found', message: user });
            }
        }
    } catch (error) {
        res.status(400).send({ error:`Error en login ${error}`});
    }
});

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: true }), async (req, res) => {
    res.status(200).send({ mensaje: req.user })
    req.session.user = {
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
});

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
});

sessionRouter.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    req.status(200).send({ mensaje: 'Session creada' })
});

sessionRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    if (req.session.login) {
        res.status(400).send({ error: `Ya hay una sesión iniciada`})
    }

    try {
        const response = await userModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        })
        res.status(200).send({ mensaje: 'Usuario creado', respuesta: response })
    } catch (error) {
        res.status(400).send({ error: `Error al crear usuario: ${error}` });
    }
});

sessionRouter.get('/logout', (req, res) => {
    if (req.session-login) {
        try {
            req.session.destroy()
            res.status(200).send({ resultado: 'Has cerrado sesion' })
        } catch (error) {
            res.status(400).send({ error: `Error al cerrar sesion: ${error}`});
        }
    } else {
        res.status(400).send({ error: `No hay sesion iniciada` });
    }
});

export default sessionRouter;