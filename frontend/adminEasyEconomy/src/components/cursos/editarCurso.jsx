import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Editarcurso() {
    const { cursoId } = useParams();
    const [course, setCourse] = useState({ title: '', description: '', checked: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/cursos/${cursoId}`)
            .then(response => {
                setCourse({
                    title: response.data.Titulo,
                    description: response.data.Descripcion,
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
            Titulo: course.title,
            Descripcion: course.description
        })
            .then(response => {
                console.log('Course updated successfully:', response.data);
                setError('');
                navigate('/home');
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
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Acepto los cambios"
                        name="checked"
                        checked={course.checked}
                        onChange={handleChange}
                    />
                </Form.Group>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button variant="warning" type="submit">
                    Cambiar
                </Button>
            </Form>
        </div>
    );
}

export default Editarcurso;
