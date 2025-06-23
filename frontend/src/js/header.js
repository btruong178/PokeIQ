import '../css/Header.css';
import { useState } from "react";
import SidePanel from './sidepanel';
import { FaBars, FaBook, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Bootstrap imports
import { Container, NavDropdown, Navbar, Nav } from 'react-bootstrap';


export function Header() {
    return (
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" className="header d-flex justify-content-center align-items-center position-relative">
            <Navbar.Brand href="/" className="nav-brand">
                PokeIQ
            </Navbar.Brand>
            <Nav className="nav-links-container">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/About">About Us</Nav.Link>
                <NavDropdown title="Quizzes" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Damage_Relations_Quiz">
                        Damage Relations
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}