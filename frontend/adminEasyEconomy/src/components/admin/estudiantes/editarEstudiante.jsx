import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './editarEstudiante.css';

function EditarEstudiante() {
  const { id } = useParams();
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [ClavePucv, setClavePucv] = useState('');
  const [clavePucvOptions, setClavePucvOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch ClavePucv options from API
    axios.get('https://easy-economy.fly.dev/clavePucv', {
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

    // Fetch student data by ID
    axios.get(`https://easy-economy.fly.dev/estudiante/${id}`, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        const { rut, nombre, clavePucv } = response.data;
        setRut(rut);
        setNombre(nombre);
        setClavePucv(clavePucv);
      })
      .catch(error => {
        console.error('There was an error fetching the student data!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña || !ClavePucv) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');

    axios.put(`https://easy-economy.fly.dev/estudiante/${id}`, { rut: Rut, nombre: Nombre, contrasenia: Contraseña, clavepucv: ClavePucv }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Estudiante actualizado exitosamente');
        navigate('/homeAdmin#Estudiantes');
      })
      .catch(error => {
        console.error('There was an error updating the student!', error);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#Estudiantes');
  };

  return (
    <div className="editar-estudiante-container">
      {loading ? (
        <Placeholder as={Form} animation="wave" className="editar-estudiante-form">
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder.Button variant="primary" xs={12} />
        </Placeholder>
      ) : (
        <Form onSubmit={handleSubmit} className="editar-estudiante-form">
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
          <Button variant="primary" type="submit" className="mt-3">
            Actualizar Alumno
          </Button>
          <Button variant="secondary" onClick={handleBack} className="mt-3">
            Volver
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditarEstudiante;