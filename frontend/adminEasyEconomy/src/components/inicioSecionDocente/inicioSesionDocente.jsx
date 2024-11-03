import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './inicioSesionDocente.css'; // Importa el archivo CSS
import { DocenteContext } from './../../context/DocenteContext'; // Importa el contexto del usuario

function InicioSesionDocente() {
  const [rut, setRut] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const { setDocente } = useContext(DocenteContext); // Usa el contexto del usuario
  const navigate = useNavigate();

  const formatRut = (value) => {
    // Eliminar todos los caracteres que no sean números
    const cleaned = value.replace(/\D/g, '');

    // Aplicar el formato
    const formatted = cleaned.replace(/^(\d{1,2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');

    return formatted;
  };

  const handleRutChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatRut(value);
    setRut(formattedValue);
  };

  const handleContraseniaChange = (e) => {
    setContrasenia(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/docente/iniciosesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contrasenia }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      setDocente(data); // Almacena los datos del usuario en el contexto
      navigate('/claveCurso'); // Redirige a la ruta /claveCurso
    } catch (error) {
      console.error('Error:', error);
      setError('Rut o contraseña incorrectos');
    }
  };

  return (
    <div className="inicio-sesion-docente-container">
      <Form className="inicio-sesion-docente-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicRut">
          <Form.Label>Rut</Form.Label>
          <Form.Control
            type="text"
            placeholder="12.34.678-9"
            value={rut}
            onChange={handleRutChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={contrasenia}
            onChange={handleContraseniaChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar Sesion
        </Button>
        {error && <p className="error-message">{error}</p>}
      </Form>
    </div>
  );
}

export default InicioSesionDocente;