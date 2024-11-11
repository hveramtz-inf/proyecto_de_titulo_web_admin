import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function VerEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
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
      axios.delete(`/api/estudiantes/${id}`)
        .then(response => {
          setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the student!', error);
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
                <Button variant="primary" onClick={() => handleEdit(estudiante.idestudiante)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(estudiante.idestudiante)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default VerEstudiantes;