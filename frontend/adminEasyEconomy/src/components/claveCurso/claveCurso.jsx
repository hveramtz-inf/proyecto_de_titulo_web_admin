import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import './claveCurso.css'; // Importar el archivo CSS
import { DocenteContext } from '../../context/DocenteContext';
import { ClaveCursoContext } from '../../context/ClaveCursoContext'; // Importar el contexto ClaveCurso
import axios from 'axios';

const ClaveCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { docente, setDocente } = useContext(DocenteContext);
  const { setClaveCurso } = useContext(ClaveCursoContext); // Usa el contexto ClaveCurso

  useEffect(() => {
    if (!docente) {
      navigate('/');
      return;
    }

    const fetchCursos = async () => {
      try {
        const response = await axios.get(`https://easy-economy.fly.dev/clavepucv/docente/${docente.id}`);
        setCursos(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Error al obtener los cursos');
        setLoading(false);
      }
    };

    fetchCursos();
  }, [docente, navigate]);

  const handleVerCursosDeClave = (clave) => {
    setClaveCurso(clave); // Establece la clave del curso en el contexto
    navigate(`/home#home`); // Navega a la ruta /home
  };

  const handleCerrarSesion = () => {
    setDocente(null); // Establece el contexto de Docente a null
    navigate('/'); // Redirige a la ruta de inicio de sesión
  };

  return (
    <div className="clave-curso-container">
      <h2 className="clave-curso-title">Listado de Claves PUCV</h2>
      <Button variant="danger" onClick={handleCerrarSesion} className="cerrar-sesion-button">
        Cerrar Sesión
      </Button>
      {loading ? (
        <div className="clave-curso-list">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className="clave-curso-card">
              <Card.Body>
                <Placeholder as={Card.Title} animation="wave">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={4} />
              </Card.Body>
            </Card>
          ))}
          <div className="spinner-overlay">
            <Spinner animation="border" role="status">
            </Spinner>
          </div>
        </div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <ListGroup className="clave-curso-list">
          {cursos.map((curso) => (
            <Card key={curso.id} className="clave-curso-card">
              <Card.Body className="clave-curso-card-body">
                <Card.Title>{curso.clave}</Card.Title>
                <Button variant="primary" onClick={() => handleVerCursosDeClave(curso)}>
                  Ver
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ClaveCurso;