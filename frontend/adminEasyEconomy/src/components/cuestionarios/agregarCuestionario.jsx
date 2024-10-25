import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AgregarCuestionario() {
    const { cursoId } = useParams();
    const [preguntas, setPreguntas] = useState([{ texto: '', respuestas: [{ texto: '', correcta: false }] }]);
    const [titulo, setTitulo] = useState('');
    const navigate = useNavigate();

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
        const cuestionario = {
            titulo,
            preguntas: preguntas.map(p => ({
                textoPregunta: p.texto,
                respuestas: p.respuestas.map(r => ({
                    textoRespuesta: r.texto,
                    valor: r.correcta
                }))
            }))
        };

        try {
            // Crear el cuestionario
            const responseCuestionario = await fetch(`http://localhost:3000/cuestionarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo: cuestionario.titulo, idcurso: cursoId }) // Incluir el cursoId
            });

            if (!responseCuestionario.ok) {
                throw new Error('Error al agregar el cuestionario');
            }

            const dataCuestionario = await responseCuestionario.json();
            const cuestionarioId = dataCuestionario.id;

            // Crear las preguntas y respuestas asociadas
            for (const pregunta of cuestionario.preguntas) {
                const responsePregunta = await fetch(`http://localhost:3000/preguntas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idcuestionario: cuestionarioId, pregunta: pregunta.textoPregunta })
                });

                if (!responsePregunta.ok) {
                    throw new Error('Error al agregar la pregunta');
                }

                const dataPregunta = await responsePregunta.json();
                const preguntaId = dataPregunta.id;

                // Crear las respuestas asociadas a la pregunta
                for (const respuesta of pregunta.respuestas) {
                    const responseRespuesta = await fetch(`http://localhost:3000/respuestas`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ idpregunta: preguntaId, respuesta: respuesta.textoRespuesta, valor: respuesta.valor })
                    });

                    if (!responseRespuesta.ok) {
                        throw new Error('Error al agregar la respuesta');
                    }
                }
            }

            console.log('Cuestionario agregado con éxito');
            navigate('/cuestionarios');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Agregar Cuestionario</h2>
            <Form onSubmit={handleSubmit}>
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
                            <Form.Label className="form-label" >Pregunta {preguntaIndex + 1}</Form.Label>
                            <Form.Control
                                type="text"
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
                                        type="text"
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
                <Button variant="primary" type="submit" className="mt-3">
                    Agregar Cuestionario
                </Button>
            </Form>
        </div>
    );
}

export default AgregarCuestionario;