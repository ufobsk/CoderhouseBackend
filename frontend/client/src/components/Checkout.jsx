import { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [orderId, setOrderId] = useState("");
  const { cart, sumTotal } = useContext(CartContext);

  const generarOrden = () => {
    if (nombre.length === 0 || email.length === 0 || telefono.length === 0) {
      return false;
    }

    const comprador = { name: nombre, phone: telefono, email: email };
    const items = cart.map((item) => ({
      id: item.id,
      title: item.titulo,
      price: item.precioMay,
    }));
    const fecha = new Date();
    const date = `${fecha.getFullYear()}-${
      fecha.getMonth() + 1
    }-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}`;
    const total = sumTotal();
    const order = { buyer: comprador, items, date, total };

    // Subir un documento a Firestore
    const db = getFirestore();
    const OrdersCollection = collection(db, "orders");
    addDoc(OrdersCollection, order)
      .then((resultado) => {
        setOrderId(resultado.id);
        navigate(`/FinalPag/${resultado.id}`, {
          state: { nombre, email, telefono },
        });
      })
      .catch((resultado) => {
        console.log("Error! No se pudo completar la compra!");
      });
  };


    return (
        <div className="container my-5">
        <div className="row">
            <div className="col-md-4 offset-md-2">
            <form>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onInput={(e) => { setNombre(e.target.value) }} />
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" onInput={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                <label className="form-label" htmlFor="telefono">Teléfono</label>
                <input type="text" className="form-control" onInput={(e) => { setTelefono(e.target.value) }} />
                </div>
                <button type="button" className="btn btn-light" onClick={generarOrden}>Generar Orden</button>
            </form>
            </div>

            <div className="col-md-4">
            <table className="table">
                <tbody>
                {cart.map(item => (
                    <tr key={item.id}>
                    <td><img src={`/assets/images/${item.imagen}`} alt={item.titulo} width={70} /></td>
                    <td className="align-middle">{item.titulo}</td>
                    <td className="align-middle">{item.quantity} x ${item.precioMay}</td>
                    <td className="align-middle text-center">${item.quantity * item.precioMay}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={3} className="align-middle text-end">Total a Pagar</td>
                    <td className="text-center">${sumTotal()}</td>
                    <td>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        {orderId ? <Navigate to = {"/FinalPag/" + orderId } /> : "" };     
        </div>
    )
}

export default Checkout;