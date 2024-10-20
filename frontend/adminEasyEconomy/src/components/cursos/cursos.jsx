import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import './cursos.css'; // Importa el archivo CSS

const Cursos = ({ claveCurso }) => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/cursos')
      .then(response => {
        setCursos(response.data);
        setLoading(false); // Desactivar el estado de carga
      })
      .catch(error => {
        setError('Error fetching cursos');
        setLoading(false); // Desactivar el estado de carga
      });
  }, []);

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
    navigate(`/cursos/agregar`, { state: { claveCurso } });
  };


  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="cursos-container">
      <h2 className="cursos-title">Lista de Cursos</h2>
      <p>Clave Curso: {claveCurso}</p>
      <Button variant="success" onClick={handleCreate} className="curso-button create">Crear Curso</Button>
      {error && <p>{error}</p>}
      <ListGroup>
        {cursos.map((curso) => (
          <ListGroup.Item key={curso.id} className="curso-item">
            <div>
              <h5>{curso.nombre}</h5>
              <p>{curso.descripcion}</p>
            </div>
            <div className="curso-actions">
              <Button variant="primary" href={`/secciones/${curso.id}`} className="curso-button view">Secciones</Button>
              <Button variant="warning" onClick={() => handleEdit(curso.id)} className="curso-button edit">Editar</Button>
              <Button variant="danger" onClick={() => handleDelete(curso.id)} className="curso-button delete">Eliminar</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cursos;