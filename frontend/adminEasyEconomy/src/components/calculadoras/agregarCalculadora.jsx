import React, { useState, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './agregarCalculadora.css';
import { ClaveCursoContext } from '../../context/ClaveCursoContext';
import { parse, re } from 'mathjs';

const AgregarCalculadora = () => {
  const [nombre, setNombre] = useState('');
  const [formula, setFormula] = useState('');
  const [ocultar, setOcultar] = useState(false);
  const [aceptarDatos, setAceptarDatos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el spinner
  const { claveCurso } = useContext(ClaveCursoContext);
  const [formulaLatex, setFormulaLatex] = useState('');
  const navigate = useNavigate();

  const handleNombreChange = (e) => setNombre(e.target.value);

  const transformToLatex = (input) => {
    try {
      const node = parse(input);
      let latex = node.toTex();
      latex = latex.replace(/\\mathrm{([a-zA-Z0-9_]+)}/g, '$1')
      latex = latex.replace(/([a-zA-Z0-9]+)_{([a-zA-Z0-9]+)}/g, '$1_{\\$2}');
      return latex;
    } catch (error) {
      console.error('Error al convertir a LaTeX:', error);
      setError('La fórmula ingresada es inválida');
      return input; // Devuelve el input original en caso de error
    }
  };

  const handleFormulaChange = (e) => {
    const input = e.target.value;
    setFormula(input);
    setError(''); // Limpiar cualquier error previo
    const latex = transformToLatex(input);
    if (latex !== input) {
      setFormulaLatex(latex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén llenos y que se acepte los datos ingresados
    if (nombre.trim() === '' || formula.trim() === '' || !aceptarDatos) {
      setError('Todos los campos son obligatorios y debe aceptar los datos ingresados');
      return;
    }

    setError(''); // Limpiar cualquier error previo
    setLoading(true); // Activar el spinner

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://easy-economy.fly.dev/calculadoras', {
        nombre,
        formula,
        ocultar,
        latexformula: formulaLatex,
        idclavepucv: claveCurso.id,
      }, {
        headers: {
          'Authorization': token,
        },
      });

      console.log('Calculadora agregada con éxito', response.data);
      navigate('/home#Calculadoras');
    } catch (error) {
      console.error('Error al agregar la calculadora:', error);
      setError('Error al agregar la calculadora');
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Calculadora</h2>
      {error && <p className="error-message">{error}</p>}
      <Form onSubmit={handleSubmit} className="form-form">
        <Form.Group className="mb-3" controlId="inputNombre">
          <Form.Label>Nombre</Form.Label>
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

        <Button variant="primary" type="submit" className="form-button" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Agregar Calculadora'}
        </Button>
      </Form>

      <div className="latex-preview">
        <h2>Vista previa de la fórmula en LaTeX</h2>
        <BlockMath math={formulaLatex} />
      </div>
    </div>
  );
};

export default AgregarCalculadora;