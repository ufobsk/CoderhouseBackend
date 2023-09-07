import { Schema, model } from "mongoose";

//MODELO DE PRODUCTOS

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requiered: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    requiered: true,
  },
  category: {
    type: String,
    requiered: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    requiered: true,
    unique: true,
  },
  thumbnail: [],
});


const productModel = model('products', productSchema);

export default productModel;