import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

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
                const response = await fetch(`http://localhost:3000/secciones/${cursoId}`); // Cambia esta URL por la de tu API
                if (!response.ok) {
                    throw new Error('Error al obtener las secciones');
                }
                const seccionesData = await response.json();
                console.log('Datos recibidos de la API:', seccionesData); // Agrega este console.log
                setSecciones(seccionesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSecciones();
    }, [cursoId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleCreate = () => {
        console.log('Crear Seccion');
        navigate(`/secciones/agregar/${cursoId}`);
    };

    const handleEdit = (seccionId) => {
        console.log(`Editar seccion con ID: ${seccionId}`);
        navigate(`/secciones/editar/${seccionId}`);
    };

    const handleDelete = async (seccionId) => {
        console.log(`Eliminar seccion con ID: ${seccionId}`);
        try {
            const response = await fetch(`http://localhost:3000/secciones/${seccionId}`, {
                method: 'DELETE'
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

    return (
        <div>
            <h2>Lista de Secciones del Curso</h2>
            <Button variant="success" onClick={handleCreate} className="mb-3">Crear Seccion</Button>
            <ListGroup>
                {secciones.map((seccion) => (
                    <ListGroup.Item key={seccion.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <div><strong>Titulo:</strong> {seccion.titulo}</div>
                        </div>
                        <ButtonGroup>
                            <Button variant="warning" onClick={() => handleEdit(seccion.id)}>Editar</Button>
                            <Button variant="danger" onClick={() => handleDelete(seccion.id)}>Eliminar</Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default VerSeccionesCurso;
