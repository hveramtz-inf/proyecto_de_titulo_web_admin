import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function InicioSesionAdmin() {
    const [id, setId] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('https://easy-economy.fly.dev/admin/iniciosesion', {
                username : id,
                contrasenia
            });

            if (response.status !== 200) {
                throw new Error('Fallo al iniciar sesión');
            }

            const data = response.data;
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            navigate('/homeAdmin');
        } catch (error) {
            setError('Fallo al iniciar sesión. Por favor, verifica tus credenciales.');
        }
        setLoading(false);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartas esta ID con nadie.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartas tu contraseña con nadie.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
            </Form>
        </div>
    );
}

export default InicioSesionAdmin;