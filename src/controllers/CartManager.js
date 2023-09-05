import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const products = new ProductManager();
class CartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  exist = async (id) => {
    let carts = await this.readCarts();
    return carts.find((cart) => cart.id === id);
  };

  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid();
    let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
    await this.writeCarts(cartsConcat);
    return "Cart Added";
  };

  getCartById = async (id) => {
    let cartById = await this.exist(id);
    if (!cartById) return "Cart Not Found";
    return cartById;
  };

  addProductToCart = async (cid, pid) => {
    let cartById = await this.exist(cid);
    if (!cartById) return "Cart Not Found";
    let productById = await products.exist(pid);
    if (!productById) return "Product Not Found";

    let allCarts = await this.readCarts();
    let cartsFilter = allCarts.filter((cart) => cart.id != cid);

    if (cartById.products.some((prod) => prod.id === pid)) {
      let productInCart = cartById.products.find((prod) => prod.id === pid);
      productInCart.quantity++;
      let cartsConcat = [productInCart, ...cartsFilter];
      await this.writeCarts(cartsConcat);
      return "Product added to cart";
    }
    cartById.products.push({ id: productById.id, quantity: 1 });
    let cartsConcat = [cartById, ...cartsFilter];
    await this.writeCarts(cartsConcat);
    return "Product added to Cart";
  };
}

export default CartManager;