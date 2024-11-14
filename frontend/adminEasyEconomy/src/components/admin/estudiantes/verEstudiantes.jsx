import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './verEstudiantes.css';

function VerEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch students data from API
    axios.get('https://easy-economy.fly.dev/estudiante', {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        setEstudiantes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students data!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarEstudiante/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      setLoadingDelete(prevState => ({ ...prevState, [id]: true }));
      const token = localStorage.getItem('token');
      axios.delete(`https://easy-economy.fly.dev/estudiante/${id}`, {
        headers: {
          'Authorization': token,
        },
      })
        .then(response => {
          setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the student!', error);
        })
        .finally(() => {
          setLoadingDelete(prevState => ({ ...prevState, [id]: false }));
        });
    }
  };

  const handleAdd = () => {
    navigate('/agregarEstudiante');
  };

  return (
    <div className="ver-estudiantes-container">
      <Button variant="success" onClick={handleAdd} className="ver-estudiantes-button">Agregar Estudiante</Button>
      <ListGroup className="ver-estudiantes-list">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ListGroup.Item key={index} className="ver-estudiantes-card">
              <Card>
                <Card.Body className="ver-estudiantes-card-body">
                  <div>
                    <Placeholder as={Card.Title} animation="wave">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="wave">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </div>
                  <div className="ver-estudiantes-card-buttons">
                    <Placeholder.Button variant="primary" xs={4} />
                    <Placeholder.Button variant="danger" xs={4} />
                  </div>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
        ) : (
          estudiantes.map(estudiante => (
            <ListGroup.Item key={estudiante.idestudiante} className="ver-estudiantes-card">
              <Card>
                <Card.Body className="ver-estudiantes-card-body">
                  <div>
                    <Card.Title className="ver-estudiantes-card-title">{estudiante.nombre}</Card.Title>
                    <Card.Text className="ver-estudiantes-card-text">{estudiante.rut}</Card.Text>
                  </div>
                  <div className="ver-estudiantes-card-buttons">
                    <Button variant="primary" onClick={() => handleEdit(estudiante.idestudiante)} disabled={loadingDelete[estudiante.idestudiante]}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(estudiante.idestudiante)} disabled={loadingDelete[estudiante.idestudiante]}>
                      {loadingDelete[estudiante.idestudiante] ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
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

export default VerEstudiantes;