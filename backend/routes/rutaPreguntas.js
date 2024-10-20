const express = require('express');
const router = express.Router();
const PreguntaCuestionario = require('../models/PreguntaCuestionarioModel'); // Asegúrate de que la ruta sea correcta

// Obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const preguntas = await PreguntaCuestionario.findAll();
    res.json(preguntas);
  } catch (err) {
    console.error('Error al obtener las preguntas', err);
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
});

// Obtener una pregunta por ID
router.get('/:id', async (req, res) => {
  try {
    const pregunta = await PreguntaCuestionario.findByPk(req.params.id);
    if (pregunta) {
      res.json(pregunta);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la pregunta', err);
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
});

// Crear una nueva pregunta
router.post('/', async (req, res) => {
  try {
    const nuevaPregunta = await PreguntaCuestionario.create(req.body);
    res.status(201).json(nuevaPregunta);
  } catch (err) {
    console.error('Error al crear la pregunta', err);
    res.status(500).json({ error: 'Error al crear la pregunta' });
  }
});

// Actualizar una pregunta por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PreguntaCuestionario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPregunta = await PreguntaCuestionario.findByPk(req.params.id);
      res.status(200).json(updatedPregunta);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la pregunta', err);
    res.status(500).json({ error: 'Error al actualizar la pregunta' });
  }
});

// Eliminar una pregunta por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PreguntaCuestionario.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Pregunta eliminada' });
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar la pregunta', err);
    res.status(500).json({ error: 'Error al eliminar la pregunta' });
  }
});

module.exports = router;