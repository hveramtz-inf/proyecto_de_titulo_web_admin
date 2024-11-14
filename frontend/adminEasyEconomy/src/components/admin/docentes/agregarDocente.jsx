import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './agregarDocente.css';

function AgregarDocente() {
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const formatRut = (value) => {
    // Eliminar caracteres no numéricos y convertir a mayúsculas
    let rut = value.replace(/[^0-9kK]/g, '').toUpperCase();

    // Agregar puntos y guión
    if (rut.length > 1) {
      rut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1);
    }

    return rut;
  };

  const handleRutChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setRut(formattedRut);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');

    axios.post('https://easy-economy.fly.dev/docente', { rut: Rut, nombre: Nombre, contrasenia: Contraseña }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Docente agregado exitosamente');
        navigate('/homeAdmin#Docentes');
      })
      .catch(error => {
        console.error('There was an error adding the docente!', error);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#Docentes');
  };

  return (
    <div className="agregar-docente-container">
      <Form onSubmit={handleSubmit} className="agregar-docente-form">
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
            onChange={handleRutChange}
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
        <Button variant="secondary" onClick={handleBack} className="mt-3">
          Volver
        </Button>
      </Form>
    </div>
  );
}

export default AgregarDocente;