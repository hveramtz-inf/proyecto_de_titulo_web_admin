import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const AgregarCurso = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim() === '' || descripcion.trim() === '') {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:3000/cursos', { Titulo: titulo, Descripcion: descripcion });
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
    <div>
      <h2>Agregar Curso</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título del Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el título del curso"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la descripción del curso"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Curso
        </Button>
      </Form>
    </div>
  );
};

export default AgregarCurso;