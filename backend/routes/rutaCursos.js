const express = require('express');
const router = express.Router();
const CursoModel = require('../models/CursoModel'); // Importa el modelo de Curso

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await CursoModel.findAll();
    res.json(cursos);
  } catch (err) {
    console.error('Error al obtener los cursos', err);
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const curso = await CursoModel.findByPk(req.params.id);
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el curso', err);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const nuevoCurso = await CursoModel.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (err) {
    console.error('Error al crear el curso', err);
    res.status(500).json({ error: 'Error al crear el curso' });
  }
});

// Actualizar un curso por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await CursoModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCurso = await CursoModel.findByPk(req.params.id);
      res.json(updatedCurso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el curso', err);
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
});

// Eliminar un curso por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await CursoModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el curso', err);
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
});

module.exports = router;