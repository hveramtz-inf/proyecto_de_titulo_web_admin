import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import './claveCurso.css'; // Importar el archivo CSS
import { DocenteContext } from '../../context/DocenteContext';
import { ClaveCursoContext } from '../../context/claveCursoContext'; // Importar el contexto ClaveCurso
import axios from 'axios';

const ClaveCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { docente } = useContext(DocenteContext);
  const { setClaveCurso } = useContext(ClaveCursoContext); // Usa el contexto ClaveCurso

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/clavepucv/docente/${docente.id}`);
        setCursos(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Error al obtener los cursos');
        setLoading(false);
      }
    };

    fetchCursos();
  }, [docente.id]);

  const handleVerCursosDeClave = (clave) => {
    setClaveCurso(clave); // Establece la clave del curso en el contexto
    navigate(`/home#home`); // Navega a la ruta /home
  };

  return (
    <div className="clave-curso-container">
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
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