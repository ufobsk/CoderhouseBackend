import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import CartWidget from "../CartWidget/CartWidget";


const NavBar = () => {

  const navigate = useNavigate();

    const handleLogout = () => {
        // Realiza la lógica de cierre de sesión aquí
        // Por ejemplo, limpiar las cookies y redirigir a la página de inicio
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src="img/logobskbeats.png" alt="" className='BskBeatsLogo'/></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/login" className="NavLinkStyle">Login</NavLink>
            <NavLink to="/register" className="NavLinkStyle">Register</NavLink>
            <NavLink to={'/category/Beats'} className="NavLinkStyle">Beats</NavLink>
            <NavLink to={'/category/Samples'} className="NavLinkStyle">Samples/Loops</NavLink>
            <NavLink to={'/category/Drumkits'} className="NavLinkStyle">Drum Kits</NavLink>
            <button onClick={handleLogout} className="NavLinkStyle">Logout</button>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    );
};

export default NavBar;