import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCuestionario = {
            titulo,
            descripcion,
            preguntas
        };

        try {
            const response = await axios.put(`http://localhost:3000/cuestionarios/${cursoId}/${cuestionarioId}`, updatedCuestionario);
            if (response.status === 200) {
                console.log('Cuestionario actualizado:', response.data);
                navigate('/cuestionarios');
            } else {
                console.error('Error al actualizar el cuestionario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitulo">
                        <Form.Label>Título del Cuestionario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el título del cuestionario"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label>Descripción del Cuestionario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la descripción del cuestionario"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    {preguntas.map((pregunta, preguntaIndex) => (
                        <div key={preguntaIndex}>
                            <Form.Group className="mb-3" controlId={`formPregunta${preguntaIndex}`}>
                                <Form.Label>Pregunta {preguntaIndex + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la pregunta"
                                    value={pregunta.textoPregunta}
                                    onChange={(e) => handlePreguntaChange(preguntaIndex, e.target.value)}
                                />
                            </Form.Group>
                            {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                                <Form.Group key={respuestaIndex} className="mb-3" controlId={`formRespuesta${preguntaIndex}-${respuestaIndex}`}>
                                    <Form.Label>Respuesta {respuestaIndex + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la respuesta"
                                        value={respuesta.textoRespuesta}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'textoRespuesta', e.target.value)}
                                    />
                                    <Form.Check
                                        type="switch"
                                        id={`switchCorrecta${preguntaIndex}-${respuestaIndex}`}
                                        label="Correcta"
                                        checked={respuesta.valor}
                                        onChange={(e) => handleRespuestaChange(preguntaIndex, respuestaIndex, 'valor', e.target.checked)}
                                    />
                                </Form.Group>
                            ))}
                        </div>
                    ))}
                    <Button variant="primary" type="submit">
                        Actualizar Cuestionario
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default EditarCuestionario;