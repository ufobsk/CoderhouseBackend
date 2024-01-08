import './Checkout.css';
import { useState, useContext } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../services/Firebase/firebaseConfig';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { CartContext } from '../../context/cartContext.jsx';

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const { cart, total, clearCart } = useContext(CartContext)

    const redirect = () => {
        setTimeout(() => {
          window.location = origin;
        }, 5000);
      };

    const createOrder = async ({ name, surname, phone, email, confirmEmail }) => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    name, surname, phone, email, confirmEmail
                },
                items: cart,
                total: total,
                status: "Generada",
                date: Timestamp.fromDate(new Date())
            }

            const orderRef = collection(db, 'orders')

            const orderAdded = await addDoc(orderRef, objOrder)

            setOrderId(orderAdded.id)
            clearCart()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return (
            <div className='Contain'>
                <h1 className='Generating'>Tu orden de compra se está generando...</h1>
            </div>
        )
    }

    if (orderId) {
        return (
            <div className='Contain'>
                <h2 className='Ordencompra'>El ID de tu orden es: {orderId}</h2>
                <h2 className='Ordencompra'>Redireccionando al inicio...</h2>
                {
                    redirect()
                }
            </div>
        )    
    }

    return (
        <div className='TicketContainer'>
        <div className="Ticket">
          <h3>Resumen de tu compra</h3>
          {cart.map((item) => (
            <div className="ItemContain" key={item.id}>
              <p id='itemName'>{item.name}</p>
              <p>Precio Unitario: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
          ))}
          <h4>Total a pagar: ${total}</h4>
        </div>
        <h3 className='CheckoutTitle'>Checkout</h3>
        <CheckoutForm onConfirm={createOrder} />
      </div>
    )
}

export default Checkout;