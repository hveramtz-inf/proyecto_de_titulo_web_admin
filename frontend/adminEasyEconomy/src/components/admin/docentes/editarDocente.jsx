import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function EditarDocente() {
  const { id } = useParams();
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docente data by ID
    axios.get(`https://easy-economy.fly.dev/docente/${id}`)
      .then(response => {
        const { rut, nombre } = response.data;
        setRut(rut);
        setNombre(nombre);
      })
      .catch(error => {
        console.error('There was an error fetching the docente data!', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña) {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.put(`https://easy-economy.fly.dev/docente/${id}`, { Rut, Nombre, contrasenia: Contraseña })
      .then(response => {
        alert('Docente actualizado exitosamente');
        navigate('/homeAdmin#Docentes');
      })
      .catch(error => {
        console.error('There was an error updating the docente!', error);
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
          Actualizar Docente
        </Button>
      </Form>
    </div>
  );
}

export default EditarDocente;