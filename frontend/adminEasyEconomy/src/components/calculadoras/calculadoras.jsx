import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import './calculadoras.css'; // Importa el archivo CSS
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { ClaveCursoContext } from '../../context/ClaveCursoContext';

const Calculadoras = () => {
  const [calculadoras, setCalculadoras] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);
  const { claveCurso } = useContext(ClaveCursoContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!claveCurso || !token) {
      navigate('/');
      return;
    }
  
    const fetchCalculadoras = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://easy-economy.fly.dev/calculadoras/clavepucv/${claveCurso.id}`, {
          headers: {
            'Authorization': token,
          },
        });
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
  }, [claveCurso, navigate]);

  const handleCreateCalculadora = () => {
    navigate('/calculadoras/crear');
  };

  const handleDeleteCalculadora = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta calculadora?. Esta acción eliminara tambien los historiales de los alumnos.');
    if (!confirmDelete) {
      return;
    }

    setDeletingId(id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://easy-economy.fly.dev/calculadoras/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCalculadoras(calculadoras.filter(calculadora => calculadora.id !== id));
    } catch (error) {
      console.error('Error deleting calculadora:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditCalculadora = (id) => {
    navigate(`/calculadoras/editar/${id}`);
  }

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
        calculadoras.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Title>No existen Calculadoras</Card.Title>
            </Card.Body>
          </Card>
        ) : (
          calculadoras.map((calculadora) => (
            <div key={calculadora.id} className="calculadora-card">
              <Card>
                <Card.Body>
                  <Card.Title>{calculadora.nombre}</Card.Title>
                  <Card.Text>
                    <BlockMath math={calculadora.latexformula} />
                  </Card.Text>
                  <Card.Text className={calculadora.ocultar ? 'text-danger' : 'text-success'}>
                    {calculadora.ocultar ? 'Esta Calculadora está oculta' : 'Esta Calculadora está visible'}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Button variant="warning" className="calculadora-button" onClick={()=> handleEditCalculadora(calculadora.id)} >Editar</Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteCalculadora(calculadora.id)}
                    disabled={deletingId === calculadora.id}
                  >
                    {deletingId === calculadora.id ? <Spinner animation="border" size="sm" /> : 'Eliminar'}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Calculadoras;