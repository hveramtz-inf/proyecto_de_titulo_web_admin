import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ClaveCurso = () => {
  const [claveCurso, setClaveCurso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/clavepucv/${claveCurso}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API Response:', data);
      // Guardar el valor de Clave Curso (puedes almacenarlo en el estado global, localStorage, etc.)
      console.log('Clave Curso:', claveCurso);
      // Redirigir a la ruta Home
      navigate(`/home?claveCurso=${data.id}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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