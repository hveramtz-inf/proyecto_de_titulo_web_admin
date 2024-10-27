import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './claveCurso.css'; // Importar el archivo CSS

const ClaveCurso = () => {
  const [claveCurso, setClaveCurso] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:3000/clavepucv/${claveCurso}`);
      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage('Curso no encontrado, intente nuevamente');
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        console.log('API Response:', data);
        // Guardar el valor de Clave Curso (puedes almacenarlo en el estado global, localStorage, etc.)
        console.log('Clave Curso:', claveCurso);
        // Redirigir a la ruta Home
        navigate(`/home?claveCurso=${data.id}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error al conectar con el servidor, intente nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clave-curso-container">
      <Form onSubmit={handleSubmit} className="clave-curso-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Clave Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="ej: ICA2160-01"
            value={claveCurso}
            onChange={(e) => setClaveCurso(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Ingresar al Curso de PUCV
        </Button>
        {loading && (
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {errorMessage && <div className="error-message mt-3">{errorMessage}</div>}
      </Form>
    </div>
  );
};

export default ClaveCurso;