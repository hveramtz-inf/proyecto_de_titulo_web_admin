const express = require('express');
const router = express.Router();
const RespuestaCuestionarioModel = require('../models/RespuestaCuestionarioModel.js'); // Asegúrate de que la ruta sea correcta

// Obtener todas las respuestas
router.get('/', async (req, res) => {
  try {
    const respuestas = await RespuestaCuestionarioModel.findAll();
    res.json(respuestas);
  } catch (err) {
    console.error('Error al obtener las respuestas', err);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  } 
});

// Obtener una respuesta por ID
router.get('/:id', async (req, res) => {
  try {
    const respuesta = await RespuestaCuestionarioModel.findByPk(req.params.id);
    if (respuesta) {
      res.json(respuesta);
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la respuesta', err);
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
});

// Obtener respuestas por idpregunta
router.get('/pregunta/:id', async (req, res) => {
  try {
    const respuestas = await RespuestaCuestionarioModel.findAll({
      where: { idpregunta: req.params.id }
    });
    res.json(respuestas);
  } catch (err) {
    console.error('Error al obtener las respuestas', err);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
});

// Crear una nueva respuesta
router.post('/', async (req, res) => {
  try {
    const nuevaRespuesta = await RespuestaCuestionarioModel.create(req.body);
    res.status(201).json(nuevaRespuesta);
  } catch (err) {
    console.error('Error al crear la respuesta', err);
    res.status(500).json({ error: 'Error al crear la respuesta' });
  }
});

// Actualizar una respuesta por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await RespuestaCuestionarioModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRespuesta = await RespuestaCuestionarioModel.findByPk(req.params.id);
      res.status(200).json(updatedRespuesta);
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la respuesta', err);
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
});

// Eliminar una respuesta por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await RespuestaCuestionarioModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Respuesta eliminada' });
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar la respuesta', err);
    res.status(500).json({ error: 'Error al eliminar la respuesta' });
  }
});

module.exports = router;