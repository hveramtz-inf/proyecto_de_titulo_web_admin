import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Cursos({ claveCurso }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/cursos'); // Cambia esta URL por la de tu API
        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }
        const cursosData = await response.json();
        console.log('Datos recibidos de la API:', cursosData); // Agrega este console.log
        setCursos(cursosData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleViewSections = (cursoId) => {
    console.log(`Ver secciones del curso con ID: ${cursoId}`);
    navigate(`/secciones/${cursoId}`);
  };

  const handleEdit = (cursoId) => {
    console.log(`Editar curso con ID: ${cursoId}`);
    navigate(`/cursos/editar/${cursoId}`);
  };

  const handleDelete = async (cursoId) => {
    console.log(`Eliminar curso con ID: ${cursoId}`);
    try {
      const response = await fetch(`http://localhost:3000/cursos/${cursoId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar el curso');
      }
      setCursos(cursos.filter(curso => curso.id !== cursoId));
      console.log(`Curso con ID: ${cursoId} eliminado exitosamente`);
    } catch (error) {
      console.error(`Error eliminando el curso con ID: ${cursoId}`, error);
      setError(`Error eliminando el curso: ${error.message}`);
    }
  };

  const handleCreate = () => {
    console.log('Crear nuevo curso');
    navigate('/cursos/agregar');
    // Aquí puedes agregar la lógica para redirigir a la página de creación de curso

  };

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <p>Clave Curso: {claveCurso}</p>
      <Button variant="success" onClick={handleCreate} className="mb-3">Crear Curso</Button>
      <ListGroup>
        {cursos.map((curso) => (
          <ListGroup.Item key={curso.id} className="d-flex justify-content-between align-items-center">
            <div>
              <div><strong>Titulo:</strong> {curso.Titulo}</div>
            </div>
            <ButtonGroup>
              <Button variant="primary" onClick={() => handleViewSections(curso.id)}>Ver Secciones</Button>
              <Button variant="warning" onClick={() => handleEdit(curso.id)}>Editar</Button>
              <Button variant="danger" onClick={() => handleDelete(curso.id)}>Eliminar</Button>
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Cursos;