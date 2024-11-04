import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editarSeccionCurso.css';

function EditarSeccionCurso() {
    const { cursoId, seccionId } = useParams();
    const [seccion, setSeccion] = useState({ titulo: '', contenido: '', linkvideoyoutube: '', checked: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/secciones/${seccionId}`)
            .then(response => {
                setSeccion({
                    titulo: response.data.titulo,
                    contenido: response.data.contenido,
                    linkvideoyoutube: response.data.linkvideoyoutube
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the seccion data!', error);
                setLoading(false);
            });
    }, [cursoId, seccionId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (seccion.titulo === '' || seccion.descripcion === '') {
            setError('Todos los campos deben estar completos.');
            return;
        }

        axios.put(`http://localhost:3000/secciones/${seccionId}`, {
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

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    return (
        <div className="editar-seccion-container">
            <h2 className="editar-seccion-title">Editar Sección</h2>
            <Form onSubmit={handleSubmit} className="editar-seccion-form">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="titulo"
                        value={seccion.titulo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        name="contenido"
                        value={seccion.contenido}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLinkVideo">
                    <Form.Label>Link de YouTube</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter YouTube link"
                        name="linkvideoyoutube"
                        value={seccion.linkvideoyoutube}
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