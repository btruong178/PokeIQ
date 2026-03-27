/**
 * @file
 * Header component
 * @module Header
 */

import '../css/Header.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

/**
 * @component
 * @returns {JSX.Element} Header component
 */

export function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="sm" className="header">
            <Container fluid>
                <Navbar.Brand href="/" className="nav-brand">
                    PokeIQ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="nav-links-container">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/About">About Us</Nav.Link>
                        <NavDropdown title="Quizzes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Damage_Relations_Quiz">
                                Damage Relations
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}