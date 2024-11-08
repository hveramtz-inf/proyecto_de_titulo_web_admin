import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate, useParams } from 'react-router-dom';
import './verSeccionesCurso.css';

const VerSeccionesCurso = () => {
    const { cursoId } = useParams();
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await fetch(`https://easy-economy.fly.dev/secciones/curso/${cursoId}`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las secciones');
                }
                const seccionesData = await response.json();
                console.log('Datos recibidos de la API:', seccionesData);
                setSecciones(seccionesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSecciones();
    }, [cursoId]);

    const handleCreate = () => {
        console.log('Crear Seccion');
        navigate(`/secciones/agregar/${cursoId}`);
    };

    const handleEdit = (seccionId) => {
        console.log(`Editar seccion con ID: ${seccionId}`);
        navigate(`/secciones/editar/${cursoId}/${seccionId}`);
    };

    const handleDelete = async (seccionId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta sección?, Se eliminara todos sus datos, los apuntes de los alumnos, progresos, etc.');
        if (confirmDelete === true) {
            console.log(`Eliminar seccion con ID: ${seccionId}`);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://easy-economy.fly.dev/secciones/${seccionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la seccion');
                }
                console.log('Seccion eliminada correctamente');
                setSecciones(secciones.filter(seccion => seccion.id !== seccionId));
            } catch (error) {
                console.error('Error al eliminar la seccion:', error);
            }
        }
    }

    const handleVolver = () => {
        navigate('/home#Cursos');
    };

    return (
        <div className="ver-secciones-container">
            <h2 className="ver-secciones-title">Lista de Secciones del Curso</h2>
            <Button variant="success" onClick={handleCreate} className="mb-3">Crear Seccion</Button>
            <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
            {loading ? (
                <div className="placeholder-container">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="ver-secciones-list-item">
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="wave">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={4} />
                            </Card.Body>
                        </Card>
                    ))}
                    <div className="spinner-overlay">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    </div>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ListGroup className="ver-secciones-list">
                    {secciones.map((seccion) => (
                        <ListGroup.Item key={seccion.id} className="ver-secciones-list-item d-flex justify-content-between align-items-center">
                            <div>
                                <div><strong>Titulo:</strong> {seccion.titulo}</div>
                            </div>
                            <ButtonGroup className="ver-secciones-list-item-buttons">
                                <Button variant="warning" onClick={() => handleEdit(seccion.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(seccion.id)}>Eliminar</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    )
}

export default VerSeccionesCurso;