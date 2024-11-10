import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AgregarClavePucv() {
  const [clave, setClave] = useState('');
  const [docente, setDocente] = useState('');
  const [docentes, setDocentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docentes data from API
    axios.get('/api/docentes')
      .then(response => {
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clave || !docente) {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.post('/api/clavesPucv', { clave, iddocente: docente })
      .then(response => {
        alert('Clave PUCV agregada exitosamente');
        navigate('/homeAdmin#ClavesPucv');
      })
      .catch(error => {
        console.error('There was an error adding the clave PUCV!', error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
            {docentes.map(docente => (
              <option key={docente.id} value={docente.id}>{docente.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Clave PUCV
        </Button>
      </Form>
    </div>
  );
}

export default AgregarClavePucv;