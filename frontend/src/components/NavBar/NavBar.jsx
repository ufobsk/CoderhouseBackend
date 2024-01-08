import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom'
import CartWidget from "../CartWidget/CartWidget";


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src="img/logobskbeats.png" alt="" className='BskBeatsLogo'/></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to={'/category/Beats'} className="NavLinkStyle">Beats</NavLink>
            <NavLink to={'/category/Samples'} className="NavLinkStyle">Samples/Loops</NavLink>
            <NavLink to={'/category/Drumkits'} className="NavLinkStyle">Drum Kits</NavLink>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    );
};

export default NavBar;