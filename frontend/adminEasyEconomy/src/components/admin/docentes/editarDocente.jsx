import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './editarDocente.css';

function EditarDocente() {
  const { id } = useParams();
  const [Rut, setRut] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch docente data by ID
    axios.get(`https://easy-economy.fly.dev/docente/${id}`, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        const { rut, nombre } = response.data;
        setRut(rut);
        setNombre(nombre);
      })
      .catch(error => {
        console.error('There was an error fetching the docente data!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Rut || !Nombre || !Contraseña) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');

    axios.put(`https://easy-economy.fly.dev/docente/${id}`, { rut: Rut, nombre: Nombre, contrasenia: Contraseña }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Docente actualizado exitosamente');
        navigate('/homeAdmin#Docentes');
      })
      .catch(error => {
        console.error('There was an error updating the docente!', error);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#Docentes');
  };

  return (
    <div className="editar-docente-container">
      {loading ? (
        <Placeholder as={Form} animation="wave" className="editar-docente-form">
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder.Button variant="primary" xs={12} />
        </Placeholder>
      ) : (
        <Form onSubmit={handleSubmit} className="editar-docente-form">
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

          <Button variant="primary" type="submit" className="mt-3">
            Actualizar Docente
          </Button>
          <Button variant="secondary" onClick={handleBack} className="mt-3">
            Volver
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditarDocente;