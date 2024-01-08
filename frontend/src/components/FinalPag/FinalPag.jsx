import { useParams, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const FinalPag = () => {
    const location = useLocation();
    const { orderId } = useParams();
    const { nombre, email, telefono } = location.state || {};
    const navigate = useNavigate();

    const mostrarAlerta = () => {
        const mensaje = `Gracias por tu compra ${nombre}!\n\nA la brevedad nos estaremos comunicando al email: ${email}\n\nO a tu teléfono: ${telefono}`;

        Swal.fire({
        title: mensaje,
        text: `Orden n°: ${orderId}`,
        icon: "success",
        confirmButtonText: "Volver al inicio"
        }).then((result) => {
        if (result.isConfirmed) {
            navigate("/");
        }
        });
    }

    return (
        <div className="container">
        <div className="row">
            <div className="col">
            {mostrarAlerta()}
            </div>
        </div>
        </div>
    )
}

export default FinalPag;