import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClaveCursoContext } from '../../context/ClaveCursoContext';
import { DocenteContext } from '../../context/DocenteContext';
import Card from 'react-bootstrap/Card';
import './bienvenidaHome.css';

function BienvenidaHome() {
  const { claveCurso } = React.useContext(ClaveCursoContext);
  const { docente } = React.useContext(DocenteContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="bienvenida-container">
      <Card className="bienvenida-card">
        <Card.Body>
          <Card.Title>Bienvenido/a</Card.Title>
          <Card.Text>
            {docente && docente.nombre ? `${docente.nombre}` : 'Nombre no disponible'}
          </Card.Text>
          <Card.Text>
            {claveCurso && claveCurso.clave ? `Clave del Curso: ${claveCurso.clave}` : 'Clave del curso no disponible'}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BienvenidaHome;