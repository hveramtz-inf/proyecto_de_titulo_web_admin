const express = require('express');
const bcrypt = require('bcrypt');
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
    const estudiante = await EstudianteModel.findOne({ where: { rut } });
    if (estudiante && await bcrypt.compare(contrasenia, estudiante.contrasenia)) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el usuario', err);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Crear un nuevo estudiante
router.post('/', async (req, res) => {
  try {
    const { rut, contrasenia, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const newEstudiante = await EstudianteModel.create({ rut, contrasenia: hashedPassword, ...rest });
    res.status(201).json(newEstudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un estudiante existente
router.put('/:id', async (req, res) => {
  try {
    const { contrasenia, ...rest } = req.body;
    const updateData = { ...rest };
    if (contrasenia) {
      updateData.contrasenia = await bcrypt.hash(contrasenia, 10);
    }
    const [updated] = await EstudianteModel.update(updateData, {
      where: { idestudiante: req.params.id }
    });
    if (updated) {
      const updatedEstudiante = await EstudianteModel.findByPk(req.params.id);
      res.json(updatedEstudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un estudiante
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EstudianteModel.destroy({
      where: { idestudiante: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;