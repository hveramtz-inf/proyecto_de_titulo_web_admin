import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DocenteContext } from '../../context/DocenteContext';
import './NavBar.css'; // Importa el archivo CSS

function NavBar({ onSelect, claveCurso, className }) {
  const navigate = useNavigate();
  const { setDocente } = useContext(DocenteContext);

  const handleSelect = (option) => {
    onSelect(option);
    navigate(`#${option}`);
  };

  const handleVolver = () => {
    navigate('/claveCurso');
  };

  const handleCerrarSesion = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    
    // Restablecer el estado del docente a null
    setDocente(null);
    
    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={className}>
      <Container>
        <Navbar.Brand href="#home">EasyEconomy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#Cursos" onClick={() => handleSelect('Cursos')}>Cursos</Nav.Link>
            <Nav.Link href="#Cuestionarios" onClick={() => handleSelect('Cuestionarios')}>Cuestionarios</Nav.Link>
            <Nav.Link href="#Calculadoras" onClick={() => handleSelect('Calculadoras')}>Calculadoras</Nav.Link>
          </Nav>
          <Nav className="nav-buttons">
            <Button variant="light" onClick={handleVolver} className="me-2">Volver</Button>
            <Button variant="danger" onClick={handleCerrarSesion}>Cerrar Sesión</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;