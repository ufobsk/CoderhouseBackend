import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

//MODELO DE PRODUCTOS

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: [],
});

productSchema.plugin(paginate);

const productModel = model('products', productSchema);

export default productModel;