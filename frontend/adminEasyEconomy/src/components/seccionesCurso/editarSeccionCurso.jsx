import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
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
        const fetchSeccion = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://easy-economy.fly.dev/secciones/${seccionId}`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setSeccion({
                    titulo: response.data.titulo,
                    contenido: response.data.contenido,
                    linkvideoyoutube: response.data.linkvideoyoutube
                });
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the seccion data!', error);
                setLoading(false);
            }
        };

        fetchSeccion();
    }, [cursoId, seccionId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (seccion.titulo === '' || seccion.contenido === '') {
            setError('Todos los campos deben estar completos.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://easy-economy.fly.dev/secciones/${seccionId}`, {
                titulo: seccion.titulo,
                contenido: seccion.contenido,
                linkvideoyoutube: seccion.linkvideoyoutube
            }, {
                headers: {
                    'Authorization': token,
                },
            });
            console.log('seccion updated successfully:', response.data);
            setError('');
            navigate(`/secciones/${cursoId}`);
        } catch (error) {
            console.error('There was an error updating the seccion!', error);
            setError('Hubo un error al actualizar la sección.');
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSeccion(prevseccion => ({
            ...prevseccion,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleVolver = () => {
        navigate(`/secciones/${cursoId}`);
    };

    if (loading) {
        return (
            <div className="editar-seccion-container">
                <h2 className="editar-seccion-title">Editar Sección</h2>
                <div className="placeholder-container">
                    <div className="spinner-overlay">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    </div>
                    <Card className="editar-seccion-placeholder">
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
                </div>
            </div>
        );
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
                        as="textarea"
                        rows={5}
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
                <Button variant="secondary" onClick={handleVolver} className="ms-2">
                    Volver
                </Button>
            </Form>
        </div>
    );
}

export default EditarSeccionCurso;