import { Link } from "react-router-dom"

const faceBookImg= "/assets/images/facebook.svg"
const instaImg= "/assets/images/instagram.svg"
const whatsImg= "/assets/images/whatsapp.svg"

const Footer = ()=> {
    return (
        <div className="container-fluid text-dark bg-dark py-2 my-4">
            <div className="row">
                <div className="col text-center text-light">
                    <p>Ayuda</p>
                    <p>Novedades</p>
                    <p>Sobre Nosotros</p>

                </div>
                <div className="col text-center my-3 d-flex justify-content-center  align-items-center">
                    <Link to ={ "https://wa.me/3416196186?text=Quiero%20consultar%20por%20un%20producto%20" } className="me-3 img-thumbnail"><img src={whatsImg} alt="whatsapp" width={20}/></Link>
                    <Link to ={ "https://www.instagram.com/" } className="me-3 img-thumbnail"><img src={instaImg} alt="Instagram" width={20}/></Link>
                    <Link to ={ "https://www.facebook.com/" } className="me-3 img-thumbnail"><img src={faceBookImg} alt="FaceBook" width={20}/></Link>
                </div>
            </div>

        </div>
    )
}
    
export default Footer