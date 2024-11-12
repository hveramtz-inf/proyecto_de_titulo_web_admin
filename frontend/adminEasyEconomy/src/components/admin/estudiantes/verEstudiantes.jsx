import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function VerEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch students data from API
    axios.get('https://easy-economy.fly.dev/estudiante')
      .then(response => {
        setEstudiantes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarEstudiante/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      setLoading(prevState => ({ ...prevState, [id]: true }));
      axios.delete(`https://easy-economy.fly.dev/estudiante/${id}`)
        .then(response => {
          setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the student!', error);
        })
        .finally(() => {
          setLoading(prevState => ({ ...prevState, [id]: false }));
        });
    }
  };

  const handleAdd = () => {
    navigate('/agregarEstudiante');
  };

  return (
    <div>
      <Button variant="success" onClick={handleAdd} className="mb-3">Agregar Estudiante</Button>
      <ListGroup>
        {estudiantes.map(estudiante => (
          <ListGroup.Item key={estudiante.idestudiante}>
            <Card>
              <Card.Body>
                <Card.Title>{estudiante.nombre}</Card.Title>
                <Card.Text>{estudiante.rut}</Card.Text>
                <Button variant="primary" onClick={() => handleEdit(estudiante.idestudiante)} disabled={loading[estudiante.idestudiante]}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(estudiante.idestudiante)} disabled={loading[estudiante.idestudiante]}>
                  {loading[estudiante.idestudiante] ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
                </Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default VerEstudiantes;