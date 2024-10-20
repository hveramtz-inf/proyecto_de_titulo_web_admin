import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import './cuestionarios.css'; // Importa el archivo CSS

const Cuestionarios = ({ claveCurso }) => {
  const [cursos, setCursos] = useState([]); // Inicializar como array vacío
  const [cuestionarios, setCuestionarios] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cursosResponse, cuestionariosResponse] = await Promise.all([
          axios.get('http://localhost:3000/cursos'),
          axios.get('http://localhost:3000/cuestionarios')
        ]);

        setCursos(cursosResponse.data);
        setCuestionarios(cuestionariosResponse.data);
        setLoading(false); // Desactivar el estado de carga
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, [claveCurso]);

  const handleCreate = (cursoId) => {
    console.log('Crear cuestionario');
    navigate(`/cuestionarios/agregar/${cursoId}`);
  };

  const handleEdit = (cursoId, cuestionarioId) => {
    console.log(`Editar cuestionario con ID: ${cuestionarioId} del curso con ID: ${cursoId}`);
    navigate(`/cuestionarios/editar/${cuestionarioId}`);
  };

  const handleDelete = async (cuestionarioId) => {
    console.log(`Eliminar cuestionario con ID: ${cuestionarioId}`);
    try {
      const response = await axios.delete(`http://localhost:3000/cuestionarios/${cuestionarioId}`);
      if (response.status === 200) {
        setCuestionarios(cuestionarios.filter(cuestionario => cuestionario.id !== cuestionarioId));
        console.log(`Cuestionario con ID: ${cuestionarioId} eliminado exitosamente`);
      } else {
        throw new Error('Error al eliminar el cuestionario');
      }
    } catch (error) {
      console.error(`Error eliminando el cuestionario con ID: ${cuestionarioId}`, error);
      setError(`Error eliminando el cuestionario: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="cuestionarios-container">
      <h2 className="cuestionarios-title">Lista de Cuestionarios</h2>
      {error && <p>{error}</p>}
      <ListGroup>
        {cursos.map((curso) => (
          <Card key={curso.id} className="curso-card">
            <Card.Body>
              <Card.Title>{curso.nombre}</Card.Title>
              <Card.Text>{curso.descripcion}</Card.Text>
              <Button variant="success" onClick={() => handleCreate(curso.id)}>Crear Cuestionario</Button>
              <ListGroup className="cuestionarios-list">
                {cuestionarios
                  .filter(cuestionario => cuestionario.idcurso === curso.id)
                  .map(cuestionario => (
                    <ListGroup.Item key={cuestionario.id} className="cuestionario-item">
                      <div>
                        <h5>{cuestionario.pregunta}</h5>
                        <p>{cuestionario.respuesta}</p>
                      </div>
                      <div className="cuestionario-actions">
                        <Button variant="warning" onClick={() => handleEdit(curso.id, cuestionario.id)}>Editar</Button>
                        <Button variant="danger" onClick={() => handleDelete(cuestionario.id)}>Eliminar</Button>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cuestionarios;