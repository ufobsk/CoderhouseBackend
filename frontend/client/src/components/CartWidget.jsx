import { Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";

const carrtioImg = '/assets/images/cart.svg';


const CartWidget = () => {
    const {cartTotal} = useContext(CartContext);

    return (
            (cartTotal() > 0) ? 
            <Link to={"/cart"}className="btn btn-light position-relative">
                <img src={carrtioImg} alt="Logo carrito" width={25} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartTotal()}</span>
            </Link> : ""
    )
}

export default CartWidget;