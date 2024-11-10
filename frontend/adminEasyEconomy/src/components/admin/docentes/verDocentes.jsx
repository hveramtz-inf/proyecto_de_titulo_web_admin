import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import TokenVerifier from './TokenVerifier';

function VerDocentes() {
  const [docentes, setDocentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docentes data from API
    axios.get('/api/docentes', {
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then(response => {
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarDocente/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      axios.delete(`/api/docentes/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      })
        .then(response => {
          setDocentes(docentes.filter(docente => docente.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the docente!', error);
        });
    }
  };

  const handleAdd = () => {
    navigate('/agregarDocente');
  };

  return (
    <TokenVerifier>
      <div>
        <Button variant="success" onClick={handleAdd} className="mb-3">Agregar Docente</Button>
        <ListGroup>
          {docentes.map(docente => (
            <ListGroup.Item key={docente.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{docente.nombre}</Card.Title>
                  <Card.Text>{docente.rut}</Card.Text>
                  <Button variant="primary" onClick={() => handleEdit(docente.id)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(docente.id)}>Eliminar</Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </TokenVerifier>
  );
}

export default VerDocentes;