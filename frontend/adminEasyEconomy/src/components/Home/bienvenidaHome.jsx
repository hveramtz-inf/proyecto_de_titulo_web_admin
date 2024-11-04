import React from 'react';
import { ClaveCursoContext } from '../../context/claveCursoContext';
import { DocenteContext } from '../../context/DocenteContext';
import Card from 'react-bootstrap/Card';
import './bienvenidaHome.css';

function BienvenidaHome() {
  const { claveCurso } = React.useContext(ClaveCursoContext);
  const { docente } = React.useContext(DocenteContext);

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