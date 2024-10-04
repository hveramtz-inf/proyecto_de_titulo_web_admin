import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

function NavBar({ onSelect }) {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home">EasyEconomy</Navbar.Brand>
                <Nav className="me-auto">
                        <Nav.Link href="#Cursos" onClick={() => onSelect('Cursos')}>Cursos</Nav.Link>
                        <Nav.Link href="#Cuestionarios" onClick={() => onSelect('Cuestionarios')}>Cuestionarios</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
    )
}

export default NavBar