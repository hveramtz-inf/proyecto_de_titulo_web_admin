const express = require('express');
const router = express.Router();
const CursoModel = require('../models/CursoModel'); // Importa el modelo de Usuario

// Ejemplo de una ruta que obtiene todos los usuarios
router.get('/', async (req, res) => {
  try {
    const Curso = await CursoModel.findAll();
    res.json(Curso);
  } catch (err) {
    console.error('Error al obtener los usuarios', err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;