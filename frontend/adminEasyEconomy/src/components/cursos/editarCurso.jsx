import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Spinner, Card, Placeholder } from 'react-bootstrap';
import './editarCurso.css'; // Importa el archivo CSS
import { ClaveCursoContext } from '../../context/ClaveCursoContext';

const EditarCurso = () => {
  const { cursoId } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ocultar, setOcultar] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner
  const navigate = useNavigate();
  const location = useLocation();
  const { claveCurso } = useContext(ClaveCursoContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchCurso = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://easy-economy.fly.dev/cursos/${cursoId}`, {
          headers: {
            'Authorization': token,
          },
        });
        setTitulo(response.data.nombre);
        setDescripcion(response.data.descripcion);
        setOcultar(response.data.ocultar);
      } catch (error) {
        console.error('There was an error fetching the course data!', error);
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    };
  
    fetchCurso();
  }, [cursoId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim() === '' || descripcion.trim() === '') {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
      setLoading(true); // Activar el spinner
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://easy-economy.fly.dev/cursos/${cursoId}`, {
          nombre: titulo,
          descripcion: descripcion,
          ocultar: ocultar,
          clavepucvid: claveCurso.id
        }, {
          headers: {
            'Authorization': token,
          },
        });
        setSuccess('Curso actualizado exitosamente');
        console.log('Formulario enviado', response.data);
        navigate('/home#Cursos');
      } catch (err) {
        setError('Error al actualizar el curso');
        console.error(err);
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    }
  };

  const handleVolver = () => {
    navigate('/home#Cursos');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Editar Curso</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="center-button">
        <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
      </div>
      {loading ? (
        <div className="placeholder-container">
          <Card className="editar-curso-placeholder">
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={4} />
            </Card.Body>
          </Card>
          <div className="spinner-overlay">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className='form-form'>
          <Form.Group controlId="formTitulo" className="form-group">
            <Form.Label className="form-label">Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion" className="form-group">
            <Form.Label className="form-label">Descripción</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formOcultar" className="form-group">
            <Form.Check
              type="switch"
              label="Ocultar"
              checked={ocultar}
              onChange={(e) => setOcultar(e.target.checked)}
              className="form-switch"
            />
          </Form.Group>
          <Button type="submit" className="form-button" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Actualizar Curso'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditarCurso;