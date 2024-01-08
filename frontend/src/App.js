import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/cartContext.jsx';
import { Login } from './components/Login/Login.jsx';
import { Register } from './components/Register/Register.jsx';
import { NewProduct } from './components/newProduct/newProduct.jsx';
import FinalPag from './components/FinalPag/FinalPag.jsx';


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <NavBar />
        <Routes>
          <Route path="/" element= {<ItemListContainer/>} />
          <Route path="/category/:categoryId" element= {<ItemListContainer/>} />
          <Route path="/item/:itemId" element= {<ItemDetailContainer/>} />
          <Route path="/cart" element= {<Cart/>} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/newProduct"} element={<NewProduct />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>

  );
};

export default App;