const express = require('express');
const router = express.Router();
const EstudianteModel = require('../models/EstudianteModel'); // Importa el modelo de Usuario

// Ejemplo de una ruta que obtiene todos los usuarios
router.get('/', async (req, res) => {
  try {
    const estudiantes = await EstudianteModel.findAll();
    res.json(estudiantes);
  } catch (err) {
    console.error('Error al obtener los usuarios', err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;