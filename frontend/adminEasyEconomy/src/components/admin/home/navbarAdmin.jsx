import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarAdmin({ onSelect }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/inicioSesionAdmin');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#Homeadmin">AdminEasyEconomy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="#ClavePucv" onClick={() => onSelect('ClavePucv')}>ClavePucv</Nav.Link>
              <Nav.Link as={Link} to="#Docentes" onClick={() => onSelect('Docentes')}>Docentes</Nav.Link>
              <Nav.Link as={Link} to="#Estudiantes" onClick={() => onSelect('Estudiantes')}>Estudiantes</Nav.Link>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>Cerrar Sesión</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarAdmin;