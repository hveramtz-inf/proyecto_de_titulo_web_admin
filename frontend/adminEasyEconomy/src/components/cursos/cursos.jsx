import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import { ClaveCursoContext } from '../../context/ClaveCursoContext'; // Asegúrate de que la ruta sea correcta
import './cursos.css'; // Importa el archivo CSS

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { claveCurso } = useContext(ClaveCursoContext);

  useEffect(() => {
    if (!claveCurso) {
      navigate('/');
      return;
    }

    axios.get(`https://easy-economy.fly.dev/cursos/clavepucv/${claveCurso.id}`)
      .then(response => {
        setCursos(response.data);
        setLoading(false); // Desactivar el estado de carga
      })
      .catch(error => {
        setError('Error fetching cursos');
        setLoading(false); // Desactivar el estado de carga
      });
  }, [claveCurso, navigate]);

  const handleCreate = () => {
    navigate('/cursos/agregar');
  };

  const handleEdit = (cursoId) => {
    console.log(`Editar curso con ID: ${cursoId}`);
    navigate(`/cursos/editar/${cursoId}`);
  };

  const handleDelete = async (cursoId) => {
    console.log(`Eliminar curso con ID: ${cursoId}`);
    setDeletingId(cursoId);
    try {
      const response = await fetch(`https://easy-economy.fly.dev/cursos/${cursoId}`, { method: 'DELETE' });
      if (response.ok) {
        setCursos(cursos.filter(curso => curso.id !== cursoId));
      } else {
        setError('Error deleting curso');
      }
    } catch (error) {
      setError('Error deleting curso');
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewSections = (cursoId) => {
    navigate(`/secciones/${cursoId}`);
  };

  if (loading) {
    return (
      <div className="cursos-container">
        <div className="cursos-title">
          <h2>Lista de Cursos</h2>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Button variant="success" disabled>
            <Placeholder.Button xs={6} />
          </Button>
        </div>
        <div className="cursos-list">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="curso-card">
              <Card>
                <Card.Body>
                  <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                  </Placeholder>
                </Card.Body>
                <Card.Body className="cursos-list-item-buttons">
                  <Button variant="primary" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                  <Button variant="warning" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                  <Button variant="danger" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className="spinner-overlay">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cursos-container">
      <div className="cursos-title">
        <h2>Lista de Cursos</h2>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="success" onClick={handleCreate}>Agregar Curso</Button>
      </div>
      {cursos.length === 0 ? (
        <Card className="no-cursos-card">
          <Card.Body>
            <Card.Title>No existe ningún curso</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <div className="cursos-list">
          {cursos.map(curso => (
            <div key={curso.id} className="curso-card">
              <Card>
                <Card.Body>
                  <Card.Title>{curso.nombre}</Card.Title>
                  <Card.Text className={curso.ocultar ? 'text-danger' : 'text-success'}>
                    {curso.ocultar ? 'Este Curso está oculto' : 'Este Curso está visible'}
                  </Card.Text>
                </Card.Body>
                <Card.Body className="cursos-list-item-buttons">
                  <Button variant="primary" onClick={() => handleViewSections(curso.id)}>Ver Secciones</Button>
                  <Button variant="warning" onClick={() => handleEdit(curso.id)}>Editar</Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(curso.id)}
                    disabled={deletingId === curso.id}
                  >
                    {deletingId === curso.id ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cursos;