const express = require('express');
const router = express.Router();
const ClavePucv = require('../models/clavePucvModel'); // Importa el modelo de Usuario

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const clavepucv = await ClavePucv.findAll();
    res.json(clavepucv);
  } catch (err) {
    console.error('Error al obtener los registros', err);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

// Obtener un registro por claveCurso
router.get('/:claveCurso', async (req, res) => {
  try {
    const clavepucv = await ClavePucv.findOne({
      where: { clave: req.params.claveCurso }
    });
    if (clavepucv) {
      res.json(clavepucv);
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el registro', err);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
  try {
    const nuevoClavePucv = await ClavePucv.create(req.body);
    res.status(201).json(nuevoClavePucv);
  } catch (err) {
    console.error('Error al crear el registro', err);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
});

// Actualizar un registro por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await ClavePucv.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedClavePucv = await ClavePucv.findByPk(req.params.id);
      res.json(updatedClavePucv);
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el registro', err);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
});

// Eliminar un registro por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ClavePucv.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el registro', err);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
});

module.exports = router;