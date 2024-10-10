import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import './cuestionarios.css'; // Importa el archivo CSS

const Cuestionarios = ({ claveCurso }) => {
  const [cursoConcuestionarios, setCursoConcuestionarios] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/cursos/`)
      .then(response => {
        console.log('Cuestionarios:', response.data);
        setCursoConcuestionarios(response.data);
        setLoading(false); // Desactivar el estado de carga
      })
      .catch(error => {
        console.error('Error fetching cuestionarios:', error);
        setError('Error fetching cuestionarios');
        setLoading(false); // Desactivar el estado de carga
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

  const handleDelete = async (cursoId, cuestionarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/cuestionarios/${cursoId}/${cuestionarioId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar el cuestionario');
      }
      setCursoConcuestionarios(prevState => 
        prevState.map(curso => 
          curso.id === cursoId 
            ? { 
                ...curso, 
                subcollections: {
                  ...curso.subcollections,
                  cuestionarios: curso.subcollections.cuestionarios.filter(cuestionario => cuestionario.id !== cuestionarioId)
                }
              } 
            : curso
        )
      );
      console.log(`Cuestionario con ID: ${cuestionarioId} eliminado exitosamente`);
    } catch (error) {
      console.error(`Error eliminando el cuestionario con ID: ${cuestionarioId}`, error);
      setError(`Error eliminando el cuestionario: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
    );
  }

  return (
    <div className="cuestionarios-container">
      <h2 className="cuestionarios-title">Lista de Cuestionarios</h2>
      <p>Clave Curso: {claveCurso}</p>
      {error && <p>{error}</p>}
      <ListGroup>
        {cursoConcuestionarios.map((curso) => (
          <ListGroup.Item key={curso.id} className="cuestionario-item list-group-item">
            <Card>
              <Card.Body>
                <Card.Title>{curso.Titulo}</Card.Title>
                <Card.Text>{curso.Descripcion}</Card.Text>
              </Card.Body>
            </Card>
            <div className='contenedor-boton-cuestionarios'>
            <Button variant="success" onClick={() => handleCreate(curso.id)}>Agregar cuestionario</Button>
            {curso.subcollections && curso.subcollections.cuestionarios && (
              <ListGroup className='cuestionarios'>
                {curso.subcollections.cuestionarios.map((cuestionario, idx) => (
                  <ListGroup.Item key={idx} className="cuestionario-item list-group-item">
                    {cuestionario.titulo}
                    <div className="cuestionario-actions">
                      <Button variant="warning" onClick={() => handleEdit(cuestionario.id)} className="cuestionario-button edit">Editar</Button>
                      <Button variant="danger" onClick={() => handleDelete(curso.id, cuestionario.id)} className="cuestionario-button delete">Eliminar</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cuestionarios;