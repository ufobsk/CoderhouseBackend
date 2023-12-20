import { Schema, model } from "mongoose";

const cartSchema = Schema({
    products: [{
        id_prod: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
})

const cartModel = model('carts', cartSchema)

export default cartModel