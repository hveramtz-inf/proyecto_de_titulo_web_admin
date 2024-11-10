import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarEstudiante() {
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [ClavePucv, setClavePucv] = useState('');
  const [clavePucvOptions, setClavePucvOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ClavePucv options from API
    axios.get('/api/clavePucv')
      .then(response => {
        setClavePucvOptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the ClavePucv options!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña || !ClavePucv) {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.post('/api/agregarEstudiante', { Rut, Nombre, Contraseña, ClavePucv })
      .then(response => {
        alert('Estudiante agregado exitosamente');
        navigate('/homeAdmin#Estudiantes');
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Agregar Alumno
        </Button>
      </Form>
    </div>
  );
}

export default AgregarEstudiante;