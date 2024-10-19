const express = require('express');
const router = express.Router();
const Seccion = require('../models/SeccionesModel'); // Importa el modelo de Usuario

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

module.exports = router;