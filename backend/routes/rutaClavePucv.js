const express = require('express');
const router = express.Router();
const ClavePucv = require('../models/clavePucvModel'); // Importa el modelo de Usuario

// Ejemplo de una ruta que obtiene todos los usuarios
router.get('/', async (req, res) => {
  try {
    const clavepucv = await ClavePucv.findAll();
    res.json(clavepucv);
  } catch (err) {
    console.error('Error al obtener los usuarios', err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;