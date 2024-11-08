import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './editarCalculadora.css'; // Importa el archivo CSS
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCalculadora = () => {
  const [nombre, setNombre] = useState('');
  const [formula, setFormula] = useState('');
  const [latexFormula, setLatexFormula] = useState('');
  const [ocultar, setOcultar] = useState(false);
  const [aceptarDatos, setAceptarDatos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [updating, setUpdating] = useState(false); // Estado para manejar el spinner al actualizar
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la calculadora desde los parámetros de la URL

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!id || !token) {
      navigate('/');
    }
    const fetchCalculadora = async () => {
      try {
        const response = await axios.get(`https://easy-economy.fly.dev/calculadoras/${id}`, {
          headers: {
            'Authorization': token,
          },
        });
        const { nombre, formula, latexformula, ocultar } = response.data;
        setNombre(nombre);
        setFormula(formula);
        setLatexFormula(latexformula);
        setOcultar(ocultar);
      } catch (error) {
        console.error('Error al obtener los datos de la calculadora:', error);
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    };
  
    fetchCalculadora();
  }, [id, navigate]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFormulaChange = (e) => {
    setFormula(e.target.value);
    setLatexFormula(e.target.value); // Aquí puedes transformar la fórmula si es necesario
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén llenos y que se acepte los datos ingresados
    if (nombre.trim() === '' || formula.trim() === '' || !aceptarDatos) {
      setError('Todos los campos son obligatorios y debe aceptar los datos ingresados');
      return;
    }

    setError(''); // Limpiar cualquier error previo
    setUpdating(true); // Activar el spinner al actualizar

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://easy-economy.fly.dev/calculadoras/${id}`, {
        nombre,
        formula,
        latexformula: latexFormula,
        ocultar
      }, {
        headers: {
          'Authorization': token,
        },
      });
      console.log('Calculadora actualizada:', response.data);
      navigate('/home#Calculadoras');
    } catch (error) {
      console.error('Error al actualizar la calculadora:', error);
      setError('Error al actualizar la calculadora');
    } finally {
      setUpdating(false); // Desactivar el spinner al actualizar
    }
  };

  const handleVolver = () => {
    navigate('/home#Calculadoras');
  };

  if (loading) {
    return (
      <div className="form-container">
        <h1 className="form-title">Editar Calculadora</h1>
        <div className="center-button">
          <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
        </div>
        <div className="placeholder-container">
          <Card className="editar-calculadora-placeholder">
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
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Calculadora</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="center-button">
        <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
      </div>
      <Form className="editar-calculadora-form" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="inputNombreFormula">
          <Form.Label>Nombre de la Calculadora</Form.Label>
          <Form.Control
            type="text"
            placeholder="ej: Elasticidad de la demanda"
            value={nombre}
            onChange={handleNombreChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="inputFormula">
          <Form.Label>Fórmula</Form.Label>
          <Form.Control
            type="text"
            placeholder="ej: ((Qf - Qi) / Qi) / ((Pf - Pi) / Pi)"
            value={formula}
            onChange={handleFormulaChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOcultar">
          <Form.Check
            type="switch"
            label="Ocultar"
            checked={ocultar}
            onChange={(e) => setOcultar(e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Acepto los datos ingresados"
            checked={aceptarDatos}
            onChange={(e) => setAceptarDatos(e.target.checked)}
          />
        </Form.Group>

        <Button variant="warning" type="submit" className="editar-calculadora-button" disabled={updating}>
          {updating ? <Spinner animation="border" size="sm" /> : 'Editar Calculadora'}
        </Button>
      </Form>

      <div className="latex-preview">
        <h2>Vista previa de la fórmula en LaTeX</h2>
        <BlockMath math={latexFormula} />
      </div>
    </div>
  );
};

export default EditarCalculadora;