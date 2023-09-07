//IMPORTACIONES
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";
import mongoose from "mongoose";


import messageModel from "./models/messages.models.js";
import productModel from "./models/products.models.js";


import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import messageRouter from "./routes/messages.routes.js";

//import ProductManager from "./controllers/ProductManager.js";


//Inicializar el servidor
const app = express();
//Creacion del puerto
const PORT = 4000;

// const productManager = new ProductManager();

//Server
const server = app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const io = new Server(server);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));



app.use("/api/products", productRouter);


mongoose
  .connect('mongodb+srv://igoico10:ufobsk27@cluster0.ukfhb57.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("BDD conectada"))
  .catch((error) => console.log(`Error en la conexión a MongoDB Atlas: ${error}`));

//Socket.io

io.on('connection', socket => {
  console.log('Conexion con Socket.io');

  socket.on('load', async () => {
    const products = await productModel.find();
    socket.emit('products', products);
  });

  socket.on('newProduct', async product => {
    await productModel.create(product);
    const products = await productModel.find();
    socket.emit('products', products);
  });

  socket.on('mensaje', async info => {
    const { email, message } = info;
    await messageModel.create({
      email,
      message,
    });
    const messages = await messageModel.find();

    io.emit('mensajes', messages);
  });
});

//Routes
app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/static', (req, res) => {
  res.render('index', {
    rutaCSS: 'index',
    rutaJS: 'index',
  });
});

app.get('/static/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    rutaCSS: 'realTimeProducts',
    rutaJS: 'realTimeProducts',
  });
});

  app.get('/static/chat', (req, res) => {
    res.render('chat', {
      rutaCSS: 'chat',
      rutaJS: 'chat',
  });
});

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messageRouter);