import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './agregarCurso.css'; // Importa el archivo CSS
import { ClaveCursoContext } from '../../context/ClaveCursoContext';

const AgregarCurso = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ocultar, setOcultar] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { claveCurso } = useContext(ClaveCursoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim() === '' || descripcion.trim() === '') {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
      try {
        const response = await axios.post('https://easy-economy.fly.dev/cursos', {
          nombre: titulo,
          descripcion: descripcion,
          ocultar: ocultar,
          clavepucvid: claveCurso.id
        });
        setSuccess('Curso agregado exitosamente');
        console.log('Formulario enviado', response.data);
        navigate('/home#Cursos');
      } catch (err) {
        setError('Error al agregar el curso');
        console.error(err);
      }
    }
  };

  const handleVolver = () => {
    navigate('/home#Cursos');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Curso</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="center-button">
        <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
      </div>
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
        <Button type="submit" className="form-button">Agregar Curso</Button>
      </Form>
    </div>
  );
};

export default AgregarCurso;