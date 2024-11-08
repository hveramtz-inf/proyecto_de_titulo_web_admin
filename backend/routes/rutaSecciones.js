const express = require('express');
const router = express.Router();
const Seccion = require('../models/SeccionesModel.js');
const Apunte = require('../models/ApunteModel.js');
const SeccionRevisada = require('../models/SeccionRevisadaModel.js');

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
  const { id } = req.params;
  const transaction = await Seccion.sequelize.transaction();
  try {
    // Eliminar apuntes asociados a la sección
    await Apunte.destroy({
      where: { seccionid: id },
      transaction
    });

    // Eliminar secciones revisadas asociadas a la sección
    await SeccionRevisada.destroy({
      where: { idseccion: id },
      transaction
    });

    // Eliminar la sección
    const deleted = await Seccion.destroy({
      where: { id },
      transaction
    });

    if (deleted) {
      await transaction.commit();
      res.status(204).json();
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'Sección no encontrada' });
    }
  } catch (err) {
    await transaction.rollback();
    console.error('Error al eliminar la sección y sus relaciones', err);
    res.status(500).json({ error: 'Error al eliminar la sección y sus relaciones' });
  }
});




module.exports = router;