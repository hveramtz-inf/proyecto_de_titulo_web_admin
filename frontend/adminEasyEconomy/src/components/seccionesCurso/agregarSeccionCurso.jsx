import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './agregarSeccionCurso.css';

const AgregarSeccionCurso = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [linkYoutube, setLinkYoutube] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { cursoId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titulo.trim() === '' || contenido.trim() === '') {
            setError('Todos los campos son obligatorios');
        } else {
            setError('');
            try {
                const response = await axios.post(`https://easy-economy.fly.dev/secciones/`, { 
                    titulo: titulo, 
                    contenido: contenido, 
                    linkvideoyoutube: linkYoutube || null,
                    idcurso: cursoId
                });
                console.log('Formulario enviado', response.data);
                setSuccess('Sección agregada exitosamente');
                navigate(`/secciones/${cursoId}`);
            } catch (err) {
                setError('Error al agregar la sección');
                console.error(err);
            }
        }
    };

    const handleVolver = () => {
        navigate(`/secciones/${cursoId}`);
    };

    return (
        <div className="agregar-seccion-container">
            <h2 className="agregar-seccion-title">Agregar Sección</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <Form onSubmit={handleSubmit} className="agregar-seccion-form">
                <Form.Group controlId="formTitulo" className="form-group">
                    <Form.Label className="form-label">Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formContenido" className="form-group">
                    <Form.Label className="form-label">Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formLinkYoutube" className="form-group">
                    <Form.Label className="form-label">Link de YouTube</Form.Label>
                    <Form.Control
                        type="text"
                        value={linkYoutube}
                        onChange={(e) => setLinkYoutube(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Button type="submit" className="form-button">Agregar Sección</Button>
                <Button variant="secondary" onClick={handleVolver} className="form-button">Volver</Button>
            </Form>
        </div>
    );
};

export default AgregarSeccionCurso;