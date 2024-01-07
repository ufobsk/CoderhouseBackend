import { useContext, useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "./context/CartContext";



const ItemDetail = ({producto}) => {
    const {addItem} = useContext(CartContext);
    const [item, setItem] = useState({});
    
        const onAdd=(quantity) => {
        addItem(item, quantity)
    }

    useEffect(() => {
        setItem(producto);
    }, [producto]);


    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-md-5 offset-md-1">
                    <img src={ "/assets/images/" + item.imagen } alt={item.titulo} className="img-fluid" />
                </div>
                <div className="col-md-5">
                    <h1>{item.titulo}</h1>
                    <h3>{item.descripcion}</h3>
                    <p><b>${item.precioMay}</b></p>
                    <ItemCount stock={item.stock} onAdd={onAdd} />
                </div>
            </div>

        </div>
    )
}

export default ItemDetail;