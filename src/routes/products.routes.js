import { Router } from "express";
//import ProductManager from "../controllers/ProductManager.js";
import productModel from "../models/products.models.js";

const productRouter = Router();
// const productManager = new ProductManager();

// routerProd.get("/", async (req, res) => {
//   const { limit } = req.query;
//   const prods = await productManager.getProducts();
//   const productos = prods.slice(0, limit);
//   res.status(200).send(productos);
// });

// routerProd.get("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const prod = await productManager.getProductsById(pid);
//   prod ? res.status(200).send(prod) : res.status(404).send("Product not found");
// });

// routerProd.post("/", async (req, res) => {
//   const confirm = await productManager.addProducts(req.body);
//   confirm
//     ? res.status(200).send("Producto creado")
//     : res.status(404).send("Este producto ya existe");
// });

// routerProd.put("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const confirm = await productManager.updateProducts(pid, req.body);
//   confirm
//     ? res.status(200).send("Product updated successfully")
//     : res.status(404).send("Product already exists");
// });

// routerProd.delete("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const confirm = await productManager.deleteProducts(pid);
//   confirm
//     ? res.status(200).send("Product deleted successfully")
//     : res.status(404).send("Product not found");
// });

// export default routerProd;

//IMPLEMENTACION EN MONGO DB
productRouter.get("/", async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  let sortOption;
  sort == "asc" && (sortOption = "price");
  sort == "desc" && (sortOption = "-price");

  const options = {
    limit: limit || 10,
    page: page || 1,
    sort: sortOption || null,
  };

  const query = {};
  category && (query.category = category);
  status && (query.status = status);

  try {
    const prods = await productModel.paginate(query, options);
    res.status(200).send({ resultado: "OK", message: prods });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos: ${error}` });
  }
});

productRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productModel.findById(pid);
    prod
      ? res.status(200).send({ resultado: "OK", message: prod })
      : res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

productRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;
  try {
    const respuesta = await productModel.create({
      title,
      description,
      category,
      stock,
      code,
      price,
    });
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
});

productRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description, stock, code, price, category, status } = req.body;
  try {
    const prod = await productModel.findByIdAndUpdate(pid, {
      title,
      description,
      category,
      stock,
      code,
      price,
    });
    prod
      ? res.status(200).send({ resultado: "OK", message: prod })
      : res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productModel.findByIdAndDelete(pid);
    prod
      ? res.status(200).send({ resultado: "OK", message: prod })
      : res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

export default productRouter;