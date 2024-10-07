import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Cuestionarios = ({ claveCurso }) => {
  const [cursoConcuestionarios, setCursoConcuestionarios] = useState([]); // Inicializar como array vacío
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/cursos/`)
      .then(response => {
        console.log('Cuestionarios:', response.data);
        setCursoConcuestionarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching cuestionarios:', error);
        setError('Error fetching cuestionarios');
      });
  }, [claveCurso]);

  const handleCreate = async (cursoId) => {
    console.log('Crear cuestionario');
    navigate(`/cuestionarios/agregar/${cursoId}`);
  };

  const handleEdit = (cuestionarioId) => {
    console.log('Editar cuestionario');
    navigate(`/cuestionarios/editar/${cuestionarioId}`);
  };

  const handleDelete = (cuestionarioId) => {
    console.log('Eliminar cuestionario');
    // Add your delete logic here
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <ListGroup>
        {cursoConcuestionarios.map((curso, index) => (
          <ListGroup.Item key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{curso.Titulo}</Card.Title>
                <Card.Text>{curso.Descripcion}</Card.Text>
              </Card.Body>
            </Card>
            <Button variant="primary" onClick={() => handleCreate(curso.id)}>Agregar cuestionario</Button>
            {curso.subcollections && curso.subcollections.cuestionarios && (
              <ListGroup>
                {curso.subcollections.cuestionarios.map((cuestionario, idx) => (
                  <ListGroup.Item key={idx}>
                    {cuestionario.titulo}
                    <Button variant="warning" onClick={() => handleEdit(cuestionario.id)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(cuestionario.id)}>Eliminar</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cuestionarios;