import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './agregarCalculadora.css'; // Importa el archivo CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClaveCursoContext } from '../../context/ClaveCursoContext';

const AgregarCalculadora = () => {
  const [nombre, setNombre] = useState('');
  const [formula, setFormula] = useState('');
  const [latexFormula, setLatexFormula] = useState('');
  const [ocultar, setOcultar] = useState(false);
  const { claveCurso } = React.useContext(ClaveCursoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!claveCurso || !token) {
      navigate('/');
    }
  }, [claveCurso, navigate]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFormulaChange = (e) => {
    setFormula(e.target.value);
    setLatexFormula(e.target.value); // Aquí puedes transformar la fórmula si es necesario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://easy-economy.fly.dev/calculadoras', {
        nombre,
        formula,
        latexformula: latexFormula,
        idclavepucv: claveCurso.id,
        ocultar
      }, {
        headers: {
          'Authorization': token,
        },
      });
      console.log('Calculadora agregada:', response.data);
      navigate('/home#Calculadoras');
    } catch (error) {
      console.error('Error al agregar la calculadora:', error);
    }
  };

  const handleVolver = () => {
    navigate('/home#Calculadoras');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Agregar Calculadora</h1>
      <div className="center-button">
        <Button variant="secondary" onClick={handleVolver} className="mb-3">Volver</Button>
      </div>
      <Form className="agregar-calculadora-form" onSubmit={handleSubmit}>
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
          <Form.Check type="checkbox" label="Acepto los datos ingresados" />
        </Form.Group>

        <Button variant="primary" type="submit" className="form-button">
          Agregar
        </Button>
      </Form>

      <div className="latex-preview">
        <h2>Vista previa de la fórmula en LaTeX</h2>
        <BlockMath math={latexFormula} />
      </div>
    </div>
  );
};

export default AgregarCalculadora;