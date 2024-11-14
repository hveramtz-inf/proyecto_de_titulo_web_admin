import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import './agregarClavePucv.css';

function AgregarClavePucv() {
  const [clave, setClave] = useState('');
  const [docente, setDocente] = useState('');
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docentes data from API
    const token = localStorage.getItem('token');
    axios.get('https://easy-economy.fly.dev/docente', {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setDocentes(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setDocentes([]);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
        setDocentes([]);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clave || !docente) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    axios.post('https://easy-economy.fly.dev/clavePucv', { clave, iddocente: docente }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Clave PUCV agregada exitosamente');
        navigate('/homeAdmin#ClavePucv');
      })
      .catch(error => {
        console.error('There was an error adding the clave PUCV!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#ClavePucv');
  };

  return (
    <div className="agregar-clave-pucv-container">
      <Form onSubmit={handleSubmit} className="agregar-clave-pucv-form">
        <Form.Group className="mb-3" controlId="formBasicClave">
          <Form.Label>Clave</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDocente">
          <Form.Label>Docente</Form.Label>
          <Form.Select
            aria-label="Seleccione un docente"
            value={docente}
            onChange={(e) => setDocente(e.target.value)}
          >
            <option value="">Seleccione un docente</option>
            {Array.isArray(docentes) && docentes.map(docente => (
              <option key={docente.id} value={docente.id}>{docente.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Agregar Clave PUCV'}
        </Button>
        <Button variant="secondary" onClick={handleBack} className="mt-3">
          Volver
        </Button>
      </Form>
    </div>
  );
}

export default AgregarClavePucv;