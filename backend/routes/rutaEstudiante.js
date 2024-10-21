const express = require('express');
const router = express.Router();
const EstudianteModel = require('../models/EstudianteModel.js'); // Importa el modelo de Usuario

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

router.post('/iniciarSesion', async (req, res) => {
  try {
    const { rut, contrasenia } = req.body;
    const estudiante = await EstudianteModel.findOne({ where: { rut, contrasenia } });
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el usuario', err);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

module.exports = router;