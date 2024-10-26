import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import './calculadoras.css'; // Importa el archivo CSS
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const Calculadoras = () => {
  const [calculadoras, setCalculadoras] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCalculadoras = async () => {
      try {
        const response = await fetch('http://localhost:3000/calculadoras');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);
        setCalculadoras(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculadoras();
  }, []);

  const handleCreateCalculadora = async () => {
    navigate('/calculadoras/crear');
  };

  return (
    <div className="calculadoras-container">
      <div className="calculadoras-title">
        <h2>Lista de Calculadoras</h2>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="success" onClick={handleCreateCalculadora}>Agregar Calculadora</Button>
      </div>
      {loading ? (
        <div className="calculadora-card">
          <div className="spinner-overlay">
            <Spinner animation="border" role="status" />
          </div>
          <Card>
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
            <Card.Body>
              <Placeholder.Button variant="warning" xs={4} />
              <Placeholder.Button variant="danger" xs={4} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
            <Card.Body>
              <Placeholder.Button variant="warning" xs={4} />
              <Placeholder.Button variant="danger" xs={4} />
            </Card.Body>
          </Card>
        </div>
      ) : (
        calculadoras.map((calculadora) => (
          <div key={calculadora.id} className="calculadora-card">
            <Card>
              <Card.Body>
                <Card.Title>{calculadora.nombre}</Card.Title>
                <Card.Text>
                  <BlockMath math={calculadora.latexformula} />
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Button variant="warning" className="calculadora-button">Editar</Button>
                <Button variant="danger">Eliminar</Button>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

export default Calculadoras;