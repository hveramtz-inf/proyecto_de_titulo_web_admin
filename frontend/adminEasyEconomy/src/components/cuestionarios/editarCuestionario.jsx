import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './editarCuestionario.css'; // Importa el archivo CSS

const EditarCuestionario = () => {
    const { cursoId, cuestionarioId } = useParams(); // Asegúrate de tener ambos IDs en los parámetros
    const [cuestionario, setCuestionario] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCuestionario = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/cuestionarios/${cursoId}/${cuestionarioId}`);
                if (response.status === 200) {
                    const data = response.data;
                    setCuestionario(data);
                    setTitulo(data.titulo);
                    setDescripcion(data.descripcion);
                    setPreguntas(data.preguntas);
                } else {
                    console.error('Error al obtener el cuestionario');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCuestionario();
    }, [cursoId, cuestionarioId]);

    const handlePreguntaChange = (index, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].textoPregunta = value;
        setPreguntas(nuevasPreguntas);
    };

    const handleRespuestaChange = (preguntaIndex, respuestaIndex, field, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].respuestas[respuestaIndex][field] = value;
        setPreguntas(nuevasPreguntas);
    };

    const agregarPregunta = () => {
        setPreguntas([...preguntas, { id: Date.now(), textoPregunta: '', respuestas: [{ textoRespuesta: '', esCorrecta: false }] }]);
    };

    const agregarRespuesta = (preguntaIndex) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].respuestas.push({ textoRespuesta: '', esCorrecta: false });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cuestionario = {
            titulo,
            descripcion,
            preguntas: preguntas.map(p => ({
                id: p.id,
                textoPregunta: p.textoPregunta,
                respuestas: p.respuestas.map(r => ({
                    id: r.id,
                    textoRespuesta: r.textoRespuesta,
                    valor: r.valor
                }))
            }))
        };

        try {
            const response = await axios.put(`http://localhost:3000/cuestionarios/${cursoId}/${cuestionarioId}`, cuestionario);
            if (response.status === 200) {
                console.log('Cuestionario actualizado exitosamente');
                navigate(`/cuestionarios`);
            } else {
                console.error('Error al actualizar el cuestionario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Editar Cuestionario</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitulo" className="form-group">
                    <Form.Label className="form-label">Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formDescripcion" className="form-group">
                    <Form.Label className="form-label">Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                {preguntas.map((pregunta, preguntaIndex) => (
                    <div key={preguntaIndex} className="pregunta-container">
                        <Form.Group className="mb-3" controlId={`formPregunta${preguntaIndex}`}>
                            <Form.Label className="form-label">Pregunta {preguntaIndex + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la pregunta"
                                value={pregunta.textoPregunta}
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
                                        value={respuesta.textoRespuesta}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'textoRespuesta', e.target.value)}
                                        className="form-control"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id={`respuestaCorrecta${preguntaIndex}-${respuestaIndex}`}
                                        label="Correcta"
                                        checked={respuesta.valor}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'valor', e.target.checked)}
                                    />
                                    {pregunta.respuestas.length > 1 && (
                                        <Button variant="danger" onClick={() => eliminarRespuesta(preguntaIndex, respuestaIndex)} className="mt-2">
                                            Eliminar Respuesta
                                        </Button>
                                    )}
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={() => agregarRespuesta(preguntaIndex)} className="mt-2">
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
                <Button variant="primary" type="submit" className="form-button mt-3">
                    Actualizar Cuestionario
                </Button>
            </Form>
        </div>
    );
};

export default EditarCuestionario;