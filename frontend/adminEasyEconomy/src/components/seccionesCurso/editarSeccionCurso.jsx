import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditarSeccionCurso() {
    const { cursoId,seccionId } = useParams();
    const [seccion, setSeccion] = useState({ titulo: '', descripcion: '',contenido:'', checked: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/secciones/${cursoId}/${seccionId}`)
            .then(response => {
                setSeccion({
                    titulo: response.data.titulo,
                    descripcion: response.data.descripcion,
                    contenido: response.data.contenido
                });
            })
            .catch(error => {
                console.error('There was an error fetching the seccion data!', error);
            });
    }, [cursoId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (seccion.title === '' || seccion.description === '') {
            setError('Todos los campos deben estar completos.');
            return;
        }

        axios.put(`http://localhost:3000/secciones/${cursoId}/${seccionId}`, {
            titulo: seccion.titulo,
            descripcion: seccion.descripcion,
            contenido: seccion.contenido

        })
            .then(response => {
                console.log('seccion updated successfully:', response.data);
                setError('');
                navigate(`/secciones/${cursoId}`);
            })
            .catch(error => {
                console.error('There was an error updating the seccion!', error);
                setError('Hubo un error al actualizar el curso.');
            });
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSeccion(prevseccion => ({
            ...prevseccion,
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
                        value={seccion.titulo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        value={seccion.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        value={seccion.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Acepto los cambios"
                        name="checked"
                        checked={seccion.checked}
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

export default EditarSeccionCurso;
