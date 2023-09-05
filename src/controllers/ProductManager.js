import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  exist = async (id) => {
    let products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  };

  //Metodo para agregar productos al json
  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid(3);
    let productAll = [...productsOld, product];
    await this.writeProducts(productAll);
    return "Producto Agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let productsById = await this.exist(id);
    if (!productsById) return "Product Not Found";
    return productsById;
  };
  updateProducts = async (id, product) => {
    let productsById = await this.exist(id);
    if(!productsById) return "Product Not Found";
    await this.deleteProducts(id);
    let productOld = await this.readProducts();
    let products = [{...product, id : id}, ...productOld];
    await this.writeProducts(products);
  };

  deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProduct = products.some((prod) => prod.id === id);
    if (existProduct) {
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Product Deleted";
    }
    return "Cannot find product to delete";
  };
}

export default ProductManager;