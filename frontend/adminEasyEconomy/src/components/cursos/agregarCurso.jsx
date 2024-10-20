import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './agregarCurso.css'; // Importa el archivo CSS

const AgregarCurso = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const claveCurso = location.state?.claveCurso || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim() === '' || descripcion.trim() === '') {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:3000/cursos', { nombre: titulo, descripcion: descripcion, clavepucvid: claveCurso });
        setSuccess('Curso agregado exitosamente');
        console.log('Formulario enviado', response.data);
        navigate('/cursos');
      } catch (err) {
        setError('Error al agregar el curso');
        console.error(err);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Curso</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" className="form-button">Agregar Curso</Button>
      </Form>
    </div>
  );
};

export default AgregarCurso;