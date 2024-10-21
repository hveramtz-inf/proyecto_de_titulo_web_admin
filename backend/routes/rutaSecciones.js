const express = require('express');
const router = express.Router();
const Seccion = require('../models/SeccionesModel.js'); // Importa el modelo de Usuario

// Ejemplo de una ruta que obtiene todos los usuarios
router.get('/', async (req, res) => {
  try {
    const secciones = await Seccion.findAll();
    res.json(secciones);
  } catch (err) {
    console.error('Error al obtener los usuarios', err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.get('/curso/:id', async (req, res) => {
  try {
    const secciones = await Seccion.findAll({ where: { idcurso: req.params.id } });
    res.json(secciones);
  } catch (err) {
    console.error('Error al obtener las secciones', err);
    res.status(500).json({ error: 'Error al obtener las secciones' });
  }
});


// Obtener una sección por ID
router.get('/:id', async (req, res) => {
  try {
    const seccion = await Seccion.findByPk(req.params.id);
    if (seccion) {
      res.json(seccion);
    } else {
      res.status(404).json({ error: 'Sección no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la sección', err);
    res.status(500).json({ error: 'Error al obtener la sección' });
  }
});


// Crear una nueva sección
router.post('/', async (req, res) => {
  try {
    const nuevaSeccion = await Seccion.create(req.body);
    res.status(201).json(nuevaSeccion);
  } catch (err) {
    console.error('Error al crear la sección', err);
    res.status(500).json({ error: 'Error al crear la sección' });
  }
});

// Actualizar una sección existente
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Seccion.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSeccion = await Seccion.findByPk(req.params.id);
      res.json(updatedSeccion);
    } else {
      res.status(404).json({ error: 'Sección no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la sección', err);
    res.status(500).json({ error: 'Error al actualizar la sección' });
  }
});

// Eliminar una sección
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Seccion.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Sección no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar la sección', err);
    res.status(500).json({ error: 'Error al eliminar la sección' });
  }
});



module.exports = router;