import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function VerClavesPucv() {
  const [clavesPucv, setClavesPucv] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch claves PUCV data from API
    axios.get('https://easy-economy.fly.dev/clavePucv')
      .then(response => {
        setClavesPucv(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the claves PUCV data!', error);
      });

    // Fetch docentes data from API
    axios.get('https://easy-economy.fly.dev/docente')
      .then(response => {
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarClavePucv/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clave PUCV?')) {
      axios.delete(`/api/clavesPucv/${id}`)
        .then(response => {
          setClavesPucv(clavesPucv.filter(cursopucv => cursopucv.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the clave PUCV!', error);
        });
    }
  };

  const handleAdd = () => {
    navigate('/agregarClavePucv');
  };

  return (
    <div>
      <Button variant="success" onClick={handleAdd} className="mb-3">Agregar Clave PUCV</Button>
      <ListGroup>
        {clavesPucv.map(cursopucv => (
          <ListGroup.Item key={cursopucv.id}>
            <Card>
              <Card.Body>
                <Card.Title>{cursopucv.clave}</Card.Title>
                <Card.Text>
                  {docentes.find(docente => docente.id === cursopucv.iddocente)?.nombre || 'Docente no asignado'}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEdit(cursopucv.id)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(cursopucv.id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default VerClavesPucv;