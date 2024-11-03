import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, ListGroup, Placeholder } from 'react-bootstrap';
import './cuestionarios.css'; // Importa el archivo CSS
import { ClaveCursoContext } from '../../context/ClaveCursoContext'; // Importa el contexto ClaveCurso

const Cuestionarios = () => {
  const [cursos, setCursos] = useState([]); // Inicializar como array vacío
  const [cuestionarios, setCuestionarios] = useState([]); // Inicializar como array vacío
  const [respuestas, setRespuestas] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { claveCurso } = useContext(ClaveCursoContext); // Usa el contexto ClaveCurso

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCursos = await fetch(`http://localhost:3000/cursos/clavepucv/${claveCurso.id}`);
        const dataCursos = await responseCursos.json();
        setCursos(dataCursos);

        const responseCuestionarios = await fetch(`http://localhost:3000/cuestionarios/clavepucv/${claveCurso.id}`);
        const dataCuestionarios = await responseCuestionarios.json();
        setCuestionarios(dataCuestionarios);

        const responseRespuestas = await fetch(`http://localhost:3000/respuestas/clavepucv/${claveCurso.id}`);
        const dataRespuestas = await responseRespuestas.json();
        setRespuestas(dataRespuestas);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [claveCurso]);

  const handleCreate = (cursoId) => {
    navigate(`/cuestionarios/agregar/${cursoId}`);
  };

  const handleEdit = (cuestionarioId) => {
    navigate(`/cuestionarios/editar/${cuestionarioId}`);
  };

  const handleDelete = async (cuestionarioId) => {
    try {
      await fetch(`http://localhost:3000/cuestionarios/${cuestionarioId}`, {
        method: 'DELETE',
      });
      setCuestionarios(cuestionarios.filter(cuestionario => cuestionario.id !== cuestionarioId));
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Card className="placeholder-card">
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Button variant="success" disabled>
              <Placeholder.Button xs={6} />
            </Button>
            <ListGroup className="cuestionarios-list">
              <ListGroup.Item className="cuestionario-item">
                <Placeholder as={Card.Title} animation="wave">
                  <Placeholder xs={6} />
                </Placeholder>
                <div className="cuestionario-item-buttons">
                  <Button variant="warning" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                  <Button variant="danger" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="placeholder-card">
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Button variant="success" disabled>
              <Placeholder.Button xs={6} />
            </Button>
            <ListGroup className="cuestionarios-list">
              <ListGroup.Item className="cuestionario-item">
                <Placeholder as={Card.Title} animation="wave">
                  <Placeholder xs={6} />
                </Placeholder>
                <div className="cuestionario-item-buttons">
                  <Button variant="warning" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                  <Button variant="danger" disabled>
                    <Placeholder.Button xs={6} />
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
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
        <ListGroup className="cuestionarios-list">
          {cursos.map(curso => (
            <Card key={curso.id} className="cuestionario-card">
              <Card.Body className="center-content">
                <Card.Title>{curso.nombre}</Card.Title>
                <Button variant="success" onClick={() => handleCreate(curso.id)}>Crear Cuestionario</Button>
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
                          <div className="cuestionario-item-buttons">
                            <Button variant="warning" onClick={() => handleEdit(cuestionario.id)}>Editar</Button>
                            <Button variant="danger" onClick={() => handleDelete(cuestionario.id)}>Eliminar</Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Cuestionarios;