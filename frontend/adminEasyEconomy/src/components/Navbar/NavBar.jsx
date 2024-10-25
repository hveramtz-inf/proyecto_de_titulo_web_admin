// frontend/adminEasyEconomy/src/components/Navbar/NavBar.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavBar({ onSelect }) {
  const navigate = useNavigate();

  const handleSelect = (option) => {
    onSelect(option);
    navigate(`#${option}`);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">EasyEconomy</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#Cursos" onClick={() => handleSelect('Cursos')}>Cursos</Nav.Link>
          <Nav.Link href="#Cuestionarios" onClick={() => handleSelect('Cuestionarios')}>Cuestionarios</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;