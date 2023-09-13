import { Router } from "express";
//import CartManager from "../controllers/CartManager.js";
import cartModel from "../models/carts.models.js";
import productModel from "../models/products.models.js";

const cartRouter = Router();

// const cartManager = new CartManager();

// routerCart.get("/", async (req, res) => {
//   const carts = await cartManager.readCarts();
//   res.status(200).send(carts);
// });

// routerCart.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   const cart = await cartManager.getCartById(cid);
//   cart ? res.status(200).send(cart) : res.status(404).send("Cart not found");
// });

// routerCart.post("/", async (req, res) => {
//   await cartManager.addCarts();
//   res.status(200).send("Cart added succefuly");
// });

// routerCart.post("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const confirm = await cartManager.addProductToCart(cid, pid);
//   confirm
//     ? res.status(200).send("Product added successfully")
//     : res.status(404).send("Product or Cart dosnt exist");
// });

// export default routerCart;





//IMPLEMENTACION EN MONGO DB
cartRouter.get('/', async (req, res) => {
	const { limit } = req.query;
	try {
		const carts = await cartModel.find().limit(limit);
		res.status(200).send({ resultado: 'OK', message: carts });
	} catch (error) {
		res.status(400).send({ error: `Error al consultar carritos: ${error}` });
	}
});

cartRouter.get('/:cid', async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartModel.findById(cid);
		cart
			? res.status(200).send({ resultado: 'OK', message: cart })
			: res.status(404).send({ resultado: 'Not Found', message: cart });
	} catch (error) {
		res.status(400).send({ error: `Error al consultar carrito: ${error}` });
	}
});

cartRouter.post('/', async (req, res) => {
	try {
		const respuesta = await cartModel.create();
		res.status(200).send({ resultado: 'OK', message: respuesta });
	} catch (error) {
		res.status(400).send({ error: `Error al crear producto: ${error}` });
	}
});

cartRouter.put('/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const cart = await cartModel.findById(cid);
		const product = await productModel.findById(pid);

		if (!product) {
			res.status(404).send({ resultado: 'Product Not Found', message: product });
			return false;
		}

		if (cart) {
			const productExists = cart.products.find(prod => prod.id === pid);
			productExists
				? productExists.quantity++
				: cart.products.push({ id_prod: product._id, quantity: 1 });
			await cart.save();
			res.status(200).send({ resultado: 'OK', message: cart });
		} else {
			res.status(404).send({ resultado: 'Cart Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al crear producto: ${error}` });
	}
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;

	try {
		const cart = await cartModel.findById(cid);

		if (cart) {
			const productExists = cart.products.find(prod => prod.id_prod == pid);
			if (productExists) {
				productExists.quantity += quantity;
		} else {
			res.status(404).send({ resultado: "Product Not Found", message: cart });
			return;
		}
		await cart.save();
		res.status(200).send({ resultado: "OK", message: cart });
	} else {
		res.status(404).send({ resultado: "Cart Not Found", message: cart });
	}
} catch (error) {
	res.status(400).send({ error: `Error al agregar productos: ${error}`});
}
});

cartRouter.put('/:cid', async (req, res) => {
	const { cid } = req.params;
	const { updateProducts } = req.body;

	try {
		const cart = await cartModel.findById(cid);
		updateProducts.forEach(prod => {
			const productExists = cart.products.find(cartProd => cartProd.id_prod == prod.id_prod);
			if (productExists) {
				productExists.quantity += prod.quantity;
			} else {
				cart.products.push(prod);
			}
		});
		await cart.save();
		cart
			? res.status(200).send({ resultado: "OK", message: cart })
			: res.status(404).send({ resultado: "Not Found", message: cart });
	} catch (error) {
		res.status(400).send({ error: `Error al agregar productos: ${error}` });
	}
});

cartRouter.delete('/:cid', async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartModel.findByIdAndDelete(cid);
		cart
			? res.status(200).send({ resultado: 'OK', message: cart })
			: res.status(404).send({ resultado: 'Not Found', message: cart });
	} catch (error) {
		res.status(400).send({ error: `Error al eliminar carrito: ${error}` });
	}
});

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;

	try{
		const cart = await cartModel.findById(cid);
		if (cart) {
			const productIndex = cart.products.findIndex(prod => prod.id_prod == pid);
			let deletedProduct;
			if (productIndex !== -1) {
				deletedProduct = cart.products[productIndex];
				cart.products.splice(productIndex, 1);
			} else {
				res.status(404).send({ resultado: "Product Not Found", message: cart});
				return;
			}
			await cart.save();
			res.status(200).send({ resultado: "OK", message: deletedProduct });
		} else {
			res.status(404).send({ resultado: "Cart Not Found", message: cart});
		}
	} catch (error) {
		res.status(400).send({ error: `Error al eliminar producto: ${error}` })
	}
});

export default cartRouter;