import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editarCurso.css'; // Importa el archivo CSS

function EditarCurso() {
    const { cursoId } = useParams();
    const [course, setCourse] = useState({ title: '', description: '', checked: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/cursos/${cursoId}`)
            .then(response => {
                setCourse({
                    title: response.data.nombre,
                    description: response.data.descripcion,
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
            descripcion: course.description
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Editar Curso</h2>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group" controlId="formTitulo">
                    <Form.Label className="form-label">Título del Curso</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        className="form-control"
                        value={course.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="formDescripcion">
                    <Form.Label className="form-label">Descripción del Curso</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        className="form-control"
                        value={course.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="form-button">Actualizar Curso</Button>
            </Form>
        </div>
    );
}

export default EditarCurso;