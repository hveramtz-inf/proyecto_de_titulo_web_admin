import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarDocente() {
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña) {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.post('/api/agregarDocente', { Rut, Nombre, Contraseña })
      .then(response => {
        alert('Docente agregado exitosamente');
        navigate('/homeAdmin#Docentes');
      })
      .catch(error => {
        console.error('There was an error adding the docente!', error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del Docente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Juan Pérez"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rut</Form.Label>
          <Form.Control
            type="text"
            placeholder="12.345.678-9"
            value={Rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Docente
        </Button>
      </Form>
    </div>
  );
}

export default AgregarDocente;