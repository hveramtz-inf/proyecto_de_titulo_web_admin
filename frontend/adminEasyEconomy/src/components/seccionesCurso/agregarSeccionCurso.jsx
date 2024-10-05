import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const AgregarSeccionCurso = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [contenido, setContenido] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { cursoId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titulo.trim() === '' || descripcion.trim() === '' || contenido.trim() === '') {
            setError('Todos los campos son obligatorios');
        } else {
            setError('');
            try {
                const response = await axios.post(`http://localhost:3000/secciones/${cursoId}`, { titulo: titulo, descripcion: descripcion, contenido: contenido });
                console.log('Formulario enviado', response.data);
                setSuccess('Sección agregada exitosamente');
                navigate(`/secciones/${cursoId}`);
            } catch (err) {
                setError('Error al agregar la sección');
                console.error(err);
            }
        }
    };

    return (
        <div>
            <h2>Agregar Sección</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitulo">
                    <Form.Label>Título de la Sección</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa el título de la sección"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa la descripción de la sección"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formContenido">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa el contenido de la sección"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Sección
                </Button>
            </Form>
        </div>
    );
};

export default AgregarSeccionCurso;