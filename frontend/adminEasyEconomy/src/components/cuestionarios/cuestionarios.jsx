import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Cuestionarios({ claveCurso }) {
  const [cursoConcuestionarios, setCursoConcuestionarios] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/cursos`)
      .then(response => {
        setCursoConcuestionarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching cuestionarios:', error);
      });
  }, [claveCurso]);

  return (
    <div>
      <ListGroup>
        {cursoConcuestionarios.map((cursoConcuestionarios, index) => (
          <ListGroup.Item key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{cursoConcuestionarios.titulo}</Card.Title>
              </Card.Body>
            </Card>
            <Button variant="primary">Agregar cuestionario</Button>
            <ListGroup>
              {cursoConcuestionarios.seccion.map((seccion, idx) => (
                <ListGroupItem key={idx}>{seccion}</ListGroupItem>
              ))}
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Cuestionarios