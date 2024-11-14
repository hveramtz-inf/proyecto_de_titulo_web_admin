import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import TokenVerifier from '../../TokenVerifier';
import './verDocentes.css';

function VerDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docentes data from API
    axios.get('https://easy-economy.fly.dev/docente', {
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then(response => {
        setDocentes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the docentes data!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarDocente/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      axios.delete(`https://easy-economy.fly.dev/docente/${id}`, {
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
      <div className="ver-docentes-container">
        <Button variant="success" onClick={handleAdd} className="ver-docentes-button">Agregar Docente</Button>
        <ListGroup className="ver-docentes-list">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <ListGroup.Item key={index} className="ver-docentes-card">
                <Card>
                  <Card.Body className="ver-docentes-card-body">
                    <div>
                      <Placeholder as={Card.Title} animation="wave">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="wave">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </div>
                    <div className="ver-docentes-card-buttons">
                      <Placeholder.Button variant="primary" xs={4} />
                      <Placeholder.Button variant="danger" xs={4} />
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))
          ) : (
            docentes.map(docente => (
              <ListGroup.Item key={docente.id} className="ver-docentes-card">
                <Card>
                  <Card.Body className="ver-docentes-card-body">
                    <div>
                      <Card.Title className="ver-docentes-card-title">{docente.nombre}</Card.Title>
                      <Card.Text className="ver-docentes-card-text">{docente.rut}</Card.Text>
                    </div>
                    <div className="ver-docentes-card-buttons">
                      <Button variant="primary" onClick={() => handleEdit(docente.id)}>Editar</Button>
                      <Button variant="danger" onClick={() => handleDelete(docente.id)}>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
    </TokenVerifier>
  );
}

export default VerDocentes;