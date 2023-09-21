import { Router } from "express";


const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    try {
        res.status(200).redirect('/static/login');
    } catch (error) {
        res.status(400).send({ error: `Error en login: ${error}`});
    }
});

homeRouter.get('*', (req, res) => {
    res.status(404).send('Error 404');
});

export default homeRouter;