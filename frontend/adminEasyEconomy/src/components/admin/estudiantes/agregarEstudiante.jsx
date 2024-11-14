import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './agregarEstudiante.css';

function AgregarEstudiante() {
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [ClavePucv, setClavePucv] = useState('');
  const [clavePucvOptions, setClavePucvOptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch ClavePucv options from API
    axios.get('https://easy-economy.fly.dev/clavepucv', {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        setClavePucvOptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the ClavePucv options!', error);
      });
  }, []);

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
    if (!Rut || !Nombre || !Contraseña || !ClavePucv) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');

    axios.post('https://easy-economy.fly.dev/estudiante', { rut: Rut, nombre: Nombre, contrasenia: Contraseña, clavepucv: ClavePucv }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Estudiante agregado exitosamente');
        navigate('/homeAdmin#Estudiantes');
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#Estudiantes');
  };

  return (
    <div className="agregar-estudiante-container">
      <Form onSubmit={handleSubmit} className="agregar-estudiante-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del Estudiante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Carlitos Palacios"
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

        <FormGroup>
          <Form.Label>Seleccione la ClavePucv</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={ClavePucv}
            onChange={(e) => setClavePucv(e.target.value)}
          >
            <option value="">Seleccione un curso</option>
            {clavePucvOptions.map(option => (
              <option key={option.id} value={option.id}>{option.clave}</option>
            ))}
          </Form.Select>
        </FormGroup>
        <Button variant="primary" type="submit" className="mt-3">
          Agregar Alumno
        </Button>
        <Button variant="secondary" onClick={handleBack} className="mt-3">
          Volver
        </Button>
      </Form>
    </div>
  );
}

export default AgregarEstudiante;