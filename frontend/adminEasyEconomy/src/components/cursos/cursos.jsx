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
    const token = localStorage.getItem('token');
    if (!token || !claveCurso) {
      navigate('/');
      return;
    }
  
    const fetchCursos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://easy-economy.fly.dev/cursos/clavepucv/${claveCurso.id}`, {
          headers: {
            'Authorization': token,
          },
        });
        setCursos(response.data);
        setLoading(false); // Desactivar el estado de carga
      } catch (error) {
        setError('Error fetching cursos');
        setLoading(false); // Desactivar el estado de carga
      }
    };
  
    fetchCursos();
  }, [claveCurso, navigate]);

  const handleCreate = () => {
    navigate('/cursos/agregar');
  };

  const handleEdit = (cursoId) => {
    console.log(`Editar curso con ID: ${cursoId}`);
    navigate(`/cursos/editar/${cursoId}`);
  };

  const handleDelete = async (cursoId) => {
    const confirmDelete = window.confirm('Se va a eliminar todo lo relacionado con este curso, tanto como las secciones, cuestionarios, los apuntes de los alumnos, progresos, etc. ¿Estás seguro?');
    if (confirmDelete) {
      setDeletingId(cursoId);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://easy-economy.fly.dev/cursos/${cursoId}`, {
          headers: {
            'Authorization': token,
          },
          timeout: 10000, // Aumentar el tiempo de espera a 10 segundos
        });
        if (response.status === 204) {
          // Realizar una nueva solicitud fetch para obtener la lista actualizada de cursos
          const updatedResponse = await axios.get(`https://easy-economy.fly.dev/cursos/clavepucv/${claveCurso.id}`, {
            headers: {
              'Authorization': token,
            },
          });
          setCursos(updatedResponse.data);
        } else {
          setError(`Error deleting curso: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error deleting curso: ${error.message}`);
      } finally {
        setDeletingId(null);
      }
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
                  <Button variant="primary" onClick={() => handleViewSections(curso.id)} disabled={deletingId === curso.id}>Ver Secciones</Button>
                  <Button variant="warning" onClick={() => handleEdit(curso.id)} disabled={deletingId === curso.id}>Editar</Button>
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