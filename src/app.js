//IMPORTACIONES
import 'dotenv/config';
import { app, io } from './config/config.js';
import express from "express";
import session from 'express-session';
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import cookieParser from 'cookie-parser';


import messageModel from "./models/messages.models.js";
import productModel from "./models/products.models.js";
import cartModel from './models/carts.models.js';
//import userModel from './models/users.models.js';


import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import messageRouter from "./routes/messages.routes.js";
import userRouter from './routes/users.routes.js';
import sessionRouter from './routes/sessions.routes.js';

//import ProductManager from "./controllers/ProductManager.js";


// const productManager = new ProductManager();

let cartId;



const authAdmin = (req, res, next) => {
  if (req.session.email == "admin@admin.com") {
      return next() //Continua con la ejecucion normal de la ruta
  }
  return res.send("No tenes acceso a este contenido")
}

const authUser = (req, res, next) => {
  if (req.session.login) {
      return next() //Continua con la ejecucion normal de la ruta
  }
  return res.send("No tenes acceso a este contenido")
}


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: {usenewUrlParser: true, useUnifiedTopology: true},
    ttl: 120
  }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


//Socket.io

io.on('connection', socket => {
  console.log('Conexion con Socket.io');

  socket.on('load', async () => {
    const data = await productModel.paginate({}, { limit: 5 });
    socket.emit('products', data);
  });

  socket.on('previousPage', async page => {
    const data = await productModel.paginate({}, { limit: 5, page: page });
    socket.emit('products', data);
  });

  socket.on('nextPage', async page => {
    const data = await productModel.paginate({}, { limit: 5, page: page });
    socket.emit('products', data);
  })

  socket.on('addProduct', async data => {
    const { pid, cartId } = data;
    if (cartId) {
      const cart = await cartModel.findById(cartId);
      const productExists = cart.products.find(prod => prod.id_prod == pid);
      productExists
        ? productExists.quantity++
        : cart.products.push({ id_prod: pid, quantity: 1});
        await cart.save();
        socket.emit('succes', cart._id.toString());
    }
  });

  socket.on('loadCart', async () => {
    const cart = await cartModel.findById(cartId).populate('products.id_prod');
    if (cart) {
      socket.emit('cartProducts', { products: cart.products, cid: cartId });
    } else {
      socket.emit('cartProducts', false);
    }
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

    socket.emit('mensajes', messages);
  });
});

//Routes
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/sessions', sessionRouter);
app.get('/*', (req, res) => {
  res.send('Error 404: Page not Found');
});



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

app.get('/static/products', (req, res) => {
  res.render('products', {
    rutaCSS: 'products',
    rutaJS: 'products',
  });
});

app.get('/static/carts/:cid', (req, res) => {
  res.render('carts', {
    rutaCSS: 'carts',
    rutaJS: 'carts',
  });
});

app.get('/static/carts', (req, res) => {
  res.render('carts', {
    rutaCSS: 'carts',
    rutaJS: 'carts',
  });
});

//Cookies

app.get('/setCookie', (req, res) => {
  res.cookie('CookieCookie', 'Esto es el valor de una cookie', { maxAge: 300000 }).send(
    'Cookie Creada'
  );
});

app.get('/getCookie', (req, res) => {
  res.send(req.signedCookies);
});

//Session

app.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Has entrado ${req.session.counter} veces a mi página`);
  } else {
    req.session.counter = 1;
    res.send('Hola por primera vez');
  }
});

app.get('/login', (req, res) => {
  const { email, password } = req.body;

  req.session.email = email;
  req.session.password = password;
  return res.send('Usuario logueado');
});

app.get('/admin', authAdmin, (req, res) => {
  res.send('Sos admin');
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
      if (error)
          console.log(error)
      else
          res.redirect('/')
  })
});
