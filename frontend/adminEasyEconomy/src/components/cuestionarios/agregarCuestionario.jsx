import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './agregarCuestionario.css';

function AgregarCuestionario() {
    const { cursoId } = useParams();
    const [preguntas, setPreguntas] = useState([{ texto: '', respuestas: [{ texto: '', correcta: false }] }]);
    const [titulo, setTitulo] = useState('');
    const [ocultar, setOcultar] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado para manejar el spinner
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const agregarPregunta = () => {
        setPreguntas([...preguntas, { texto: '', respuestas: [{ texto: '', correcta: false }] }]);
    };

    const agregarRespuesta = (preguntaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].respuestas.push({ texto: '', correcta: false });
        setPreguntas(nuevasPreguntas);
    };

    const eliminarPregunta = (preguntaIndex) => {
        const nuevasPreguntas = preguntas.filter((_, index) => index !== preguntaIndex);
        setPreguntas(nuevasPreguntas);
    };

    const eliminarRespuesta = (preguntaIndex, respuestaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].respuestas = nuevasPreguntas[preguntaIndex].respuestas.filter((_, index) => index !== respuestaIndex);
        setPreguntas(nuevasPreguntas);
    };

    const handlePreguntaChange = (index, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].texto = value;
        setPreguntas(nuevasPreguntas);
    };

    const handleRespuestaChange = (preguntaIndex, respuestaIndex, field, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].respuestas[respuestaIndex][field] = value;
        setPreguntas(nuevasPreguntas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que el título no esté vacío
        if (titulo.trim() === '') {
            setError('El título del cuestionario es obligatorio');
            return;
        }

        // Verificar que todas las preguntas y respuestas no estén vacías
        for (const pregunta of preguntas) {
            if (pregunta.texto.trim() === '') {
                setError('Todas las preguntas deben tener texto');
                return;
            }
            for (const respuesta of pregunta.respuestas) {
                if (respuesta.texto.trim() === '') {
                    setError('Todas las respuestas deben tener texto');
                    return;
                }
            }
        }

        setError(''); // Limpiar cualquier error previo
        setLoading(true); // Activar el spinner
        try {
            const token = localStorage.getItem('token');
            // Crear el cuestionario
            const responseCuestionario = await fetch(`https://easy-economy.fly.dev/cuestionarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ titulo: titulo, idcurso: cursoId, ocultar: ocultar }) // Incluir el cursoId y ocultar
            });

            if (!responseCuestionario.ok) {
                throw new Error('Error al agregar el cuestionario');
            }

            const dataCuestionario = await responseCuestionario.json();
            const cuestionarioId = dataCuestionario.id;

            // Crear las preguntas y respuestas asociadas
            for (const pregunta of preguntas) {
                const responsePregunta = await fetch(`https://easy-economy.fly.dev/preguntas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify({ idcuestionario: cuestionarioId, pregunta: pregunta.texto })
                });

                if (!responsePregunta.ok) {
                    throw new Error('Error al agregar la pregunta');
                }

                const dataPregunta = await responsePregunta.json();
                const preguntaId = dataPregunta.id;

                // Crear las respuestas asociadas a la pregunta
                for (const respuesta of pregunta.respuestas) {
                    const responseRespuesta = await fetch(`https://easy-economy.fly.dev/respuestas`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                        body: JSON.stringify({ idpregunta: preguntaId, respuesta: respuesta.texto, valor: respuesta.correcta })
                    });

                    if (!responseRespuesta.ok) {
                        throw new Error('Error al agregar la respuesta');
                    }
                }
            }

            console.log('Cuestionario agregado con éxito');
            navigate('/home#Cuestionarios');
        } catch (error) {
            console.error('Error:', error);
            setError('Error al agregar el cuestionario');
        } finally {
            setLoading(false); // Desactivar el spinner
        }
    };

    const handleVolver = () => {
        navigate('/home#Cuestionarios');
    };

    return (
        <div className="form-container form-agregar-cuestionario">
            <h2 className="form-title">Agregar Cuestionario</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="center-button">
                <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
            </div>
            <Form onSubmit={handleSubmit} className='form-form'>
                <Form.Group controlId="formTitulo" className="form-group">
                    <Form.Label className="form-label">Título del Cuestionario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el título del cuestionario"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>

                {preguntas.map((pregunta, preguntaIndex) => (
                    <div key={preguntaIndex} className="pregunta-container" >
                        <Form.Group className="mb-3" controlId={`formPregunta${preguntaIndex}`}>
                            <Form.Label className="form-label">Pregunta {preguntaIndex + 1}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Ingrese la pregunta"
                                value={pregunta.texto}
                                onChange={(e) => handlePreguntaChange(preguntaIndex, e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                            <div key={respuestaIndex} className="respuesta-container">
                               <Form.Group className="mb-3" controlId={`formRespuesta${preguntaIndex}-${respuestaIndex}`}>
                                    <Form.Label className="form-label">Respuesta {respuestaIndex + 1}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Ingrese la respuesta"
                                        value={respuesta.texto}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'texto', e.target.value)}
                                        className="form-control"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id={`respuestaCorrecta${preguntaIndex}-${respuestaIndex}`}
                                        label="Correcta"
                                        checked={respuesta.correcta}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'correcta', e.target.checked)}
                                    />
                                    {pregunta.respuestas.length > 1 && (
                                        <Button variant="danger" onClick={() => eliminarRespuesta(preguntaIndex, respuestaIndex)} className="mt-2">
                                            Eliminar Respuesta
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}

                        <Button variant="secondary" onClick={() => agregarRespuesta(preguntaIndex)}>
                            Agregar Respuesta
                        </Button>
                        {preguntas.length > 1 && (
                            <Button variant="danger" onClick={() => eliminarPregunta(preguntaIndex)} className="mt-2">
                                Eliminar Pregunta
                            </Button>
                        )}
                    </div>
                ))}

                <Button variant="secondary" onClick={agregarPregunta} className="mt-3">
                    Agregar Pregunta
                </Button>

                <Form.Group controlId="formOcultar" className="form-group">
                    <Form.Check
                        type="switch"
                        label="Ocultar"
                        checked={ocultar}
                        onChange={(e) => setOcultar(e.target.checked)}
                        className="form-switch"
                    />
                </Form.Group>

                <Button type="submit" className="form-button mt-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Agregar Cuestionario'}
                </Button>
            </Form>
        </div>
    );
}

export default AgregarCuestionario;