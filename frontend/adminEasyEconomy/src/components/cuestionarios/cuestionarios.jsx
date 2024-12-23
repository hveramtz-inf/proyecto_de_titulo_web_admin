import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, ListGroup, Placeholder } from 'react-bootstrap';
import './cuestionarios.css'; // Importa el archivo CSS
import { ClaveCursoContext } from '../../context/ClaveCursoContext'; // Importa el contexto ClaveCurso

const Cuestionarios = () => {
  const [cursos, setCursos] = useState([]); // Inicializar como array vacío
  const [cuestionarios, setCuestionarios] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { claveCurso } = useContext(ClaveCursoContext); // Usa el contexto ClaveCurso

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !claveCurso) {
      navigate('/');
      return;
    }
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const responseCursos = await fetch(`https://easy-economy.fly.dev/cursos/clavepucv/${claveCurso.id}`, {
          headers: {
            'Authorization': token,
          },
        });
        const dataCursos = await responseCursos.json();
        setCursos(dataCursos);
  
        const responseCuestionarios = await fetch(`https://easy-economy.fly.dev/cuestionarios/clavepucv/${claveCurso.id}`, {
          headers: {
            'Authorization': token,
          },
        });
        const dataCuestionarios = await responseCuestionarios.json();
        setCuestionarios(dataCuestionarios);
  
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [claveCurso, navigate]);

  const handleCreate = (cursoId) => {
    navigate(`/cuestionarios/agregar/${cursoId}`);
  };

  const handleEdit = (cuestionarioId) => {
    navigate(`/cuestionarios/editar/${cuestionarioId}`);
  };

  const handleDelete = async (cuestionarioId) => {
    const confirmDelete = window.confirm('Se va a eliminar todo lo relacionado con este cuestionario, incluyendo las preguntas, respuestas y puntajes de los alumnos asociados. ¿Estás seguro?');
    if (confirmDelete) {
      setDeletingId(cuestionarioId);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token provided');
        }
        const response = await fetch(`https://easy-economy.fly.dev/cuestionarios/${cuestionarioId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete cuestionario');
        }
        setCuestionarios(cuestionarios.filter(cuestionario => cuestionario.id !== cuestionarioId));
      } catch (error) {
        setError(error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="cuestionarios-container">
        <div className="cuestionarios-title">
          <h2>Lista de Cuestionarios</h2>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Button variant="success" disabled>
            <Placeholder.Button xs={6} />
          </Button>
        </div>
        <div className="cuestionarios-list">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="cuestionario-card">
              <Card>
                <Card.Body>
                  <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                  </Placeholder>
                </Card.Body>
                <Card.Body>
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
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="cuestionarios-container">
      <div className="cuestionarios-title">
        <h2>Lista de Cuestionarios</h2>
      </div>
      {cursos.length === 0 ? (
        <Card className="no-cursos-card">
          <Card.Body>
            <Card.Title>Se necesita crear un curso para crear un cuestionario</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <div className="cuestionarios-list">
          {cursos.map(curso => (
            <div key={curso.id} className="cuestionario-card">
              <Card>
                <Card.Body>
                  <Card.Title>{curso.nombre}</Card.Title>
                  <div className="crear-cuestionario-button-container">
                    <Button variant="success" onClick={() => handleCreate(curso.id)} className="crear-cuestionario-button">Crear Cuestionario</Button>
                  </div>
                  {cuestionarios.filter(cuestionario => cuestionario.idcurso === curso.id).length === 0 ? (
                    <Card className="no-cuestionarios-card">
                      <Card.Body>
                        <Card.Title>No existen Cuestionarios en el Curso</Card.Title>
                      </Card.Body>
                    </Card>
                  ) : (
                    <ListGroup className="cuestionarios-list">
                      {cuestionarios
                        .filter(cuestionario => cuestionario.idcurso === curso.id)
                        .map(cuestionario => (
                          <ListGroup.Item key={cuestionario.id} className="cuestionario-item">
                            <Card.Title>{cuestionario.titulo}</Card.Title>
                            <Card.Text className={cuestionario.ocultar ? 'text-danger' : 'text-success'}>
                              {cuestionario.ocultar ? 'Este Cuestionario está oculto' : 'Este Cuestionario está visible'}
                            </Card.Text>
                            <div className="cuestionario-item-buttons">
                              <Button variant="warning" onClick={() => handleEdit(cuestionario.id)} disabled={deletingId === cuestionario.id}>Editar</Button>
                              <Button 
                                variant="danger" 
                                onClick={() => handleDelete(cuestionario.id)}
                                disabled={deletingId === cuestionario.id}
                              >
                                {deletingId === cuestionario.id ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cuestionarios;