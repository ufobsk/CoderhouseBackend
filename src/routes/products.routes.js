import { Router } from "express";
import productModel from "../models/products.models.js";

const productRouter = Router()


//METODO GET
productRouter.get('/', async (req, res) => {
    const { limit } = req.query
    try {
        const prods = await productModel.find().limit(limit)
        res.status(200).send({resultado: 'OK', products: prods})
    } catch (error) {
        res.status(400).send({error: `Error al consultar productos: ${error}`})
    }
});

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const prod = await productModel.findById(id)
        res.status(200).send({resultado: 'OK', product: prod})
    } catch (error) {
        res.status(400).send({error: `Error al consultar producto: ${error}`})
    }
})