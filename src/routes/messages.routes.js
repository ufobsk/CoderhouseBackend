import { Router } from "express";
import messageModel from "../models/messages.models";

const messageRouter = Router()

messageRouter.get('/', async (req, res) => {
	try {
		const messages = await messageModel.find();
		res.status(200).send({ resultado: 'OK', message: messages });
	} catch (error) {
		res.status(400).send({ error: `Error al consultar mensajes: ${error}` });
	}
});

messageRouter.post('/', async (req, res) => {
	const { email, message } = req.body;

	try {
		const respuesta = await messageModel.create({
			email,
			message,
		});
		res.status(200).send({ resultado: 'OK', message: respuesta });
	} catch (error) {
		res.status(400).send({ error: `Error al crear producto: ${error}` });
	}
});

export default messageRouter;