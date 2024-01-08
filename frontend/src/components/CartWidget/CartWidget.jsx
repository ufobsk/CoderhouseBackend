import "../../App.css";
import Badge from 'react-bootstrap/Badge';
import cart from './assets/cart.svg';
import { CartContext } from "../../context/cartContext.jsx";
// import { Link } from "react-router-dom";
import { useContext } from "react";

 const styles = {
     img: {
         height: 30
     }
};

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext)
    
    return (
        <Badge bg="warning" text="dark">
            <img className="CartImg" src={cart} alt="cart-widget" style={styles.img}/>
            <span className="TotalQuantity">{totalQuantity}</span>
        </Badge>
    );
};

export default CartWidget;