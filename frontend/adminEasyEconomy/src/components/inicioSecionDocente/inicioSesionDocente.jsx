import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './inicioSesionDocente.css';
import { DocenteContext } from './../../context/DocenteContext';

function InicioSesionDocente() {
  const [rut, setRut] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setDocente } = useContext(DocenteContext);
  const navigate = useNavigate();

  const formatRut = (value) => {
    // Eliminar todos los caracteres que no sean números o 'k'
    let rut = value.replace(/[^0-9kK]/g, '').toUpperCase();

    // Agregar puntos y guión
    if (rut.length > 1) {
      rut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1);
    }

    return rut;
  };

  const handleRutChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setRut(formattedRut);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://easy-economy.fly.dev/docente/iniciosesion', {
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
      setDocente(data.docente);
      localStorage.setItem('token', data.token);
      setSuccess(true);
      navigate('/claveCurso'); // Redirigir inmediatamente
    } catch (error) {
      console.error('Error:', error);
      setError('Rut o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inicio-sesion-docente-container">
      <Form className="inicio-sesion-docente-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicRut">
          <Form.Label className='label-rut'>Rut</Form.Label>
          <Form.Control
            type="text"
            placeholder="12.345.678-9"
            value={rut}
            onChange={handleRutChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='label-contraseña'>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </Form.Group>
        <Button
          variant={success ? "success" : "primary"}
          type="submit"
          disabled={loading || success}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : success ? (
            <span>&#10003; Inicio Correcto</span>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
        {error && <p className="error-message">{error}</p>}
      </Form>
    </div>
  );
}

export default InicioSesionDocente;