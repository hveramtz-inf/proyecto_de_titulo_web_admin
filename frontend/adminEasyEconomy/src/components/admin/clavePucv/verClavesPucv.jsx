import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './verClavesPucv.css';

function VerClavesPucv() {
  const [clavesPucv, setClavesPucv] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch claves PUCV data from API
    axios.get('https://easy-economy.fly.dev/clavePucv', {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        setClavesPucv(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the claves PUCV data!', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch docentes data from API
    axios.get('https://easy-economy.fly.dev/docente', {
      headers: {
        'Authorization': `${token}`
      }
    })
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
      const token = localStorage.getItem('token');
      setLoadingDelete(prevState => ({ ...prevState, [id]: true }));
      axios.delete(`https://easy-economy.fly.dev/clavePucv/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      })
        .then(response => {
          setClavesPucv(clavesPucv.filter(cursopucv => cursopucv.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the clave PUCV!', error);
        })
        .finally(() => {
          setLoadingDelete(prevState => ({ ...prevState, [id]: false }));
        });
    }
  };

  const handleAdd = () => {
    navigate('/agregarClavePucv');
  };

  return (
    <div className="ver-claves-pucv-container">
      <Button variant="success" onClick={handleAdd} className="ver-claves-pucv-button">Agregar Clave PUCV</Button>
      <ListGroup className="ver-claves-pucv-list">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ListGroup.Item key={index} className="ver-claves-pucv-card">
              <Card>
                <Card.Body className="ver-claves-pucv-card-body">
                  <div>
                    <Placeholder as={Card.Title} animation="wave">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="wave">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </div>
                  <div className="ver-claves-pucv-card-buttons">
                    <Placeholder.Button variant="primary" xs={4} />
                    <Placeholder.Button variant="danger" xs={4} />
                  </div>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
        ) : (
          clavesPucv.map(cursopucv => (
            <ListGroup.Item key={cursopucv.id} className="ver-claves-pucv-card">
              <Card>
                <Card.Body className="ver-claves-pucv-card-body">
                  <div>
                    <Card.Title className="ver-claves-pucv-card-title">{cursopucv.clave}</Card.Title>
                    <Card.Text className="ver-claves-pucv-card-text">
                      {"Impartido por: " + docentes.find(docente => docente.id === cursopucv.iddocente)?.nombre || 'Docente no asignado'}
                    </Card.Text>
                  </div>
                  <div className="ver-claves-pucv-card-buttons">
                    <Button variant="primary" onClick={() => handleEdit(cursopucv.id)} disabled={loadingDelete[cursopucv.id]}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(cursopucv.id)} disabled={loadingDelete[cursopucv.id]}>
                      {loadingDelete[cursopucv.id] ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
}

export default VerClavesPucv;