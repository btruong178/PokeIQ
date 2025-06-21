import '../css/Header.css';
import { useState } from "react";
import SidePanel from './sidepanel';
import { FaBars, FaBook, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Bootstrap imports
import { Container, NavDropdown, Navbar, Nav } from 'react-bootstrap';


export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidePanel = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" expand="sm" className="header">
                <Container>
                    <Navbar.Brand href="/">PokeIQ</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/About">About Us</Nav.Link>
                        <NavDropdown title="Quizzes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Damage_Relations_Quiz">Damage Relations</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Container>
            </Navbar>
        </>
    );
}