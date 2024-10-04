import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ClaveCurso = () => {
  const [claveCurso, setClaveCurso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Guardar el valor de Clave Curso (puedes almacenarlo en el estado global, localStorage, etc.)
    console.log('Clave Curso:', claveCurso);
    // Redirigir a la ruta Home
    navigate(`/home?claveCurso=${claveCurso}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Clave Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Clave de Curso"
            value={claveCurso}
            onChange={(e) => setClaveCurso(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ClaveCurso;