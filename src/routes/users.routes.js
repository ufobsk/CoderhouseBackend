import { Router } from "express";
import { createHash } from "../utils/bcrypt.js";
import userModel from "../models/users.models.js";

const userRouter = Router();

userRouter.get('/register', (req, res) => {
    res.render('register')
});

userRouter.post('/', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const hashPassword = createHash(password);
        const response = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashPassword,
            age: age
        })
        res.status(200).send({ mesnaje: 'Usuario creado', respuesta: response })
    } catch (error) {
        res.status(400).send({ error: `Error al crear usuario: ${error}` });
    }
});

export default userRouter;