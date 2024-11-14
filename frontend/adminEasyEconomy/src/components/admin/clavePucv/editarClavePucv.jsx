import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './editarClavePucv.css';

function EditarClavePucv() {
  const { id } = useParams();
  const [clave, setClave] = useState('');
  const [docente, setDocente] = useState('');
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch clave PUCV data by ID
    axios.get(`https://easy-economy.fly.dev/clavePucv/${id}`, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        const { clave, iddocente } = response.data;
        setClave(clave);
        setDocente(iddocente);
      })
      .catch(error => {
        console.error('There was an error fetching the clave PUCV data!', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch docentes data from API
    axios.get('https://easy-economy.fly.dev/docente', {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clave || !docente) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');

    axios.put(`https://easy-economy.fly.dev/clavePucv/${id}`, { clave, iddocente: docente }, {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        alert('Clave PUCV actualizada exitosamente');
        navigate('/homeAdmin#ClavePucv');
      })
      .catch(error => {
        console.error('There was an error updating the clave PUCV!', error);
      });
  };

  const handleBack = () => {
    navigate('/homeAdmin#ClavePucv');
  };

  return (
    <div className="editar-clave-pucv-container">
      {loading ? (
        <Placeholder as={Form} animation="wave" className="editar-clave-pucv-form">
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder xs={12} className="mb-3" />
          <Placeholder.Button variant="primary" xs={12} />
        </Placeholder>
      ) : (
        <Form onSubmit={handleSubmit} className="editar-clave-pucv-form">
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

          <Button variant="primary" type="submit" className="mt-3">
            Actualizar Clave PUCV
          </Button>
          <Button variant="secondary" onClick={handleBack} className="mt-3">
            Volver
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditarClavePucv;