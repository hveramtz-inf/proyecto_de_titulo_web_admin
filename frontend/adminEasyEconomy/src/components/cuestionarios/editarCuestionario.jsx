import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import './editarCuestionario.css'; // Importa el archivo CSS

const EditarCuestionario = () => {
    const { cuestionarioId } = useParams(); // Asegúrate de tener ambos IDs en los parámetros
    const [cuestionario, setCuestionario] = useState({});
    const [titulo, setTitulo] = useState('');
    const [ocultar, setOcultar] = useState(false);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [preguntasAEliminar, setPreguntasAEliminar] = useState([]);
    const [respuestasAEliminar, setRespuestasAEliminar] = useState([]);
    const [updating, setUpdating] = useState(false); // Estado para manejar el spinner al actualizar
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchCuestionario = async () => {
            try {
                const response = await axios.get(`https://easy-economy.fly.dev/cuestionarios/${cuestionarioId}`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setCuestionario(response.data);
                setTitulo(response.data.titulo);
                setOcultar(response.data.ocultar);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchPreguntas = async () => {
            try {
                const response = await axios.get(`https://easy-economy.fly.dev/preguntas/cuestionario/${cuestionarioId}`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setPreguntas(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchRespuestas = async () => {
            try {
                const response = await axios.get(`https://easy-economy.fly.dev/respuestas`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setRespuestas(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchData = async () => {
            await fetchCuestionario();
            await fetchPreguntas();
            await fetchRespuestas();
            setLoading(false);
        };

        fetchData();
    }, [cuestionarioId, navigate]);

    const handlePreguntaChange = (index, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].pregunta = value;
        setPreguntas(nuevasPreguntas);
    };

    const handleRespuestaChange = (preguntaIndex, respuestaIndex, field, value) => {
        const nuevasRespuestas = [...respuestas];
        const respuesta = nuevasRespuestas.find((r) => r.id === respuestaIndex);
        if (respuesta) {
            respuesta[field] = value;
            setRespuestas(nuevasRespuestas);
        }
    };

    const agregarPregunta = () => {
        const nuevaPregunta = { id: Date.now(), pregunta: '', idcuestionario: cuestionarioId };
        setPreguntas([...preguntas, nuevaPregunta]);
        const nuevaRespuesta = { id: Date.now(), respuesta: '', valor: false, idpregunta: nuevaPregunta.id };
        setRespuestas([...respuestas, nuevaRespuesta]);
    };

    const eliminarPregunta = (preguntaId, preguntaIndex) => {
        setPreguntasAEliminar([...preguntasAEliminar, preguntaId]);
        const nuevasPreguntas = preguntas.filter((_, index) => index !== preguntaIndex);
        setPreguntas(nuevasPreguntas);
        const nuevasRespuestas = respuestas.filter((respuesta) => respuesta.idpregunta !== preguntaId);
        setRespuestas(nuevasRespuestas);
    };

    const agregarRespuesta = (preguntaId) => {
        setRespuestas([...respuestas, { id: Date.now(), respuesta: '', valor: false, idpregunta: preguntaId }]);
    };

    const eliminarRespuesta = (respuestaId) => {
        setRespuestasAEliminar([...respuestasAEliminar, respuestaId]);
        const nuevasRespuestas = respuestas.filter((respuesta) => respuesta.id !== respuestaId);
        setRespuestas(nuevasRespuestas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cuestionarioActualizado = {
            titulo,
            ocultar,
            preguntas: preguntas.map(p => ({
                id: p.id,
                pregunta: p.pregunta,
                idcuestionario: p.idcuestionario,
                respuestas: respuestas.filter(r => r.idpregunta === p.id).map(r => ({
                    id: r.id,
                    respuesta: r.respuesta,
                    valor: r.valor,
                    idpregunta: r.idpregunta
                }))
            }))
        };

        setUpdating(true); // Activar el spinner al actualizar
        try {
            const token = localStorage.getItem('token');

            // Actualizar el cuestionario
            await axios.put(`https://easy-economy.fly.dev/cuestionarios/${cuestionarioId}`, { titulo, ocultar }, {
                headers: {
                    'Authorization': token,
                },
            });

            // Eliminar preguntas y respuestas
            await Promise.all([
                ...preguntasAEliminar.map(id => axios.delete(`https://easy-economy.fly.dev/preguntas/${id}`, {
                    headers: {
                        'Authorization': token,
                    },
                })),
                ...respuestasAEliminar.map(id => axios.delete(`https://easy-economy.fly.dev/respuestas/${id}`, {
                    headers: {
                        'Authorization': token,
                    },
                }))
            ]);

            // Actualizar preguntas y respuestas
            await Promise.all(cuestionarioActualizado.preguntas.map(async (pregunta) => {
                if (!pregunta.id) {
                    // Nueva pregunta
                    const response = await axios.post('https://easy-economy.fly.dev/preguntas', pregunta, {
                        headers: {
                            'Authorization': token,
                        },
                    });
                    pregunta.id = response.data.id;
                } else {
                    // Pregunta existente
                    await axios.put(`https://easy-economy.fly.dev/preguntas/${pregunta.id}`, pregunta, {
                        headers: {
                            'Authorization': token,
                        },
                    });
                }

                await Promise.all(pregunta.respuestas.map(async (respuesta) => {
                    if (!respuesta.id) {
                        // Nueva respuesta
                        await axios.post('https://easy-economy.fly.dev/respuestas', respuesta, {
                            headers: {
                                'Authorization': token,
                            },
                        });
                    } else {
                        // Respuesta existente
                        await axios.put(`https://easy-economy.fly.dev/respuestas/${respuesta.id}`, respuesta, {
                            headers: {
                                'Authorization': token,
                            },
                        });
                    }
                }));
            }));

            console.log('Cuestionario actualizado exitosamente');
            navigate(`/home#Cuestionarios`);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setUpdating(false); // Desactivar el spinner al actualizar
        }
    };

    const handleVolver = () => {
        navigate('/home#Cuestionarios');
    };

    if (loading) {
        return (
            <div className="placeholder-container">
                <Card className="editar-cuestionario-placeholder">
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
                <div className="spinner-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div className="editar-cuestionario-container">
            <h2 className="editar-cuestionario-title">Editar Cuestionario</h2>
            <div className="center-button">
                <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
            </div>
            <Form onSubmit={handleSubmit} className="editar-cuestionario-form">
                <Form.Group controlId="formTitulo" className="form-group">
                    <Form.Label className="form-label">Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formOcultar" className="form-group">
                    <Form.Check
                        type="switch"
                        label="Ocultar"
                        checked={ocultar}
                        onChange={(e) => setOcultar(e.target.checked)}
                        className="form-switch"
                    />
                </Form.Group>

                {preguntas.map((pregunta, preguntaIndex) => (
                    <div key={preguntaIndex} className="pregunta-container">
                        <Form.Group className="mb-3" controlId={`formPregunta${preguntaIndex}`}>
                            <Form.Label className="form-label">Pregunta {preguntaIndex + 1}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Ingrese la pregunta"
                                value={pregunta.pregunta}
                                onChange={(e) => handlePreguntaChange(preguntaIndex, e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>
                        {respuestas.filter((respuesta) => respuesta.idpregunta === pregunta.id).map((respuesta, respuestaIndex) => (
                            <div key={respuestaIndex} className="respuesta-container">
                                <Form.Group className="mb-3" controlId={`formRespuesta${preguntaIndex}-${respuestaIndex}`}>
                                    <Form.Label className="form-label">Respuesta {respuestaIndex + 1}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Ingrese la respuesta"
                                        value={respuesta.respuesta}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuesta.id, 'respuesta', e.target.value)}
                                        className="form-control"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id={`respuestaCorrecta${preguntaIndex}-${respuestaIndex}`}
                                        label="Correcta"
                                        checked={respuesta.valor}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuesta.id, 'valor', e.target.checked)}
                                    />
                                    {respuestas.filter((r) => r.idpregunta === pregunta.id).length > 1 && (
                                        <Button variant="danger" onClick={() => eliminarRespuesta(respuesta.id)} className="mt-2">
                                            Eliminar Respuesta
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={() => agregarRespuesta(pregunta.id)} className="mt-2">
                            Agregar Respuesta
                        </Button>
                        {preguntas.length > 1 && (
                            <Button variant="danger" onClick={() => eliminarPregunta(pregunta.id, preguntaIndex)} className="mt-2">
                                Eliminar Pregunta
                            </Button>
                        )}
                    </div>
                ))}
                <Button variant="secondary" onClick={agregarPregunta} className="mt-3">
                    Agregar Pregunta
                </Button>
                <Button variant="warning" type="submit" className="form-button mt-3" disabled={updating}>
                    {updating ? <Spinner animation="border" size="sm" /> : 'Actualizar Cuestionario'}
                </Button>
            </Form>
        </div>
    );
};

export default EditarCuestionario;