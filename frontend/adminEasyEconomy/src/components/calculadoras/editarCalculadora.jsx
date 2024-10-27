import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './editarCalculadora.css'; // Importa el archivo CSS
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCalculadora = () => {
  const [nombre, setNombre] = useState('');
  const [formula, setFormula] = useState('');
  const [latexFormula, setLatexFormula] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la calculadora desde los parámetros de la URL

  useEffect(() => {
    const fetchCalculadora = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/calculadoras/${id}`);
        const { nombre, formula, latexformula } = response.data;
        setNombre(nombre);
        setFormula(formula);
        setLatexFormula(latexformula);
      } catch (error) {
        console.error('Error al obtener los datos de la calculadora:', error);
      }
    };

    fetchCalculadora();
  }, [id]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFormulaChange = (e) => {
    setFormula(e.target.value);
    setLatexFormula(e.target.value); // Aquí puedes transformar la fórmula si es necesario
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/calculadoras/${id}`, {
        nombre,
        formula,
        latexformula: latexFormula
      });
      console.log('Calculadora actualizada:', response.data);
    } catch (error) {
      console.error('Error al actualizar la calculadora:', error);
    }
    navigate('/home#Calculadoras');
  };

  return (
    <div className="editar-calculadora-container">
      <h1 className="editar-calculadora-title">Editar Calculadora</h1>
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Acepto los datos ingresados" />
        </Form.Group>

        <Button variant="primary" type="submit" className="editar-calculadora-button">
          Editar
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