import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './editarCurso.css'; // Importa el archivo CSS

function EditarCurso() {
    const { cursoId } = useParams();
    const [course, setCourse] = useState({ title: '', description: '', ocultar: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/cursos/${cursoId}`)
            .then(response => {
                setCourse({
                    title: response.data.nombre,
                    description: response.data.descripcion,
                    ocultar: response.data.ocultar
                });
            })
            .catch(error => {
                console.error('There was an error fetching the course data!', error);
            });
    }, [cursoId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (course.title === '' || course.description === '') {
            setError('Todos los campos deben estar completos.');
            return;
        }

        axios.put(`http://localhost:3000/cursos/${cursoId}`, {
            nombre: course.title,
            descripcion: course.description,
            ocultar: course.ocultar
        })
        .then(response => {
            console.log('Curso actualizado:', response.data);
            navigate('/home#Cursos');
        })
        .catch(error => {
            console.error('There was an error updating the course!', error);
            setError('Hubo un error al actualizar el curso.');
        });
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="editar-curso-container">
            <h2 className="editar-curso-title">Editar Curso</h2>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit} className="editar-curso-form">
                <Form.Group controlId="formTitle" className="form-group">
                    <Form.Label className="form-label">Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formDescription" className="form-group">
                    <Form.Label className="form-label">Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formOcultar" className="form-group">
                    <Form.Check
                        type="switch"
                        label="Ocultar"
                        name="ocultar"
                        checked={course.ocultar}
                        onChange={handleChange}
                        className="form-switch"
                    />
                </Form.Group>
                <Button type="submit" className="form-button">Actualizar Curso</Button>
            </Form>
        </div>
    );
}

export default EditarCurso;