import { createContext, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (quantity === 0) {
      Toastify({
        text: "La cantidad tiene que ser mayor a 0",
        className: "info",
        style: {
          background: "linear-gradient(to right, #54553d, #ffe500)",
          fontSize: "x-large",
        },
      }).showToast();
    } else {
      if (!isInCart(item.id)) {
        setCart(prevCart => [
          ...prevCart,
          { ...item, quantity: parseInt(quantity) }
        ]);
        Toastify({
          text: "Producto agregado",
          className: "info",
          style: {
            background: "linear-gradient(to right, #54553d, #ffe500)",
            fontSize: "x-large",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Prodcuto ya agregado, Visite el Carrito",
          className: "info",
          style: {
            background: "linear-gradient(to right, #54553d, #ffe500)",
            fontSize: "x-large",
          },
        }).showToast();
      }
    }
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, totalQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
