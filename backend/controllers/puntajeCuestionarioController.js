const PuntajeCuestionario = require('../models/PuntajeCuestionarioModel.js');

// Obtener todos los puntajes
exports.getAllPuntajes = async (req, res) => {
  try {
    const puntajes = await PuntajeCuestionario.findAll();
    res.json(puntajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un puntaje por ID
exports.getPuntajeById = async (req, res) => {
  try {
    const puntaje = await PuntajeCuestionario.findByPk(req.params.id);
    if (puntaje) {
      res.json(puntaje);
    } else {
      res.status(404).json({ error: 'Puntaje no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener puntajes por ID de estudiante
exports.getPuntajesByEstudianteId = async (req, res) => {
  try {
    const puntajes = await PuntajeCuestionario.findAll({ where: { idestudiante: req.params.idestudiante } });
    res.json(puntajes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo puntaje
exports.createPuntaje = async (req, res) => {
  try {
    const nuevoPuntaje = await PuntajeCuestionario.create(req.body);
    res.status(201).json(nuevoPuntaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un puntaje por ID
exports.updatePuntaje = async (req, res) => {
  try {
    const puntaje = await PuntajeCuestionario.findByPk(req.params.id);
    if (puntaje) {
      await puntaje.update(req.body);
      res.json(puntaje);
    } else {
      res.status(404).json({ error: 'Puntaje no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un puntaje por ID
exports.deletePuntaje = async (req, res) => {
  try {
    const puntaje = await PuntajeCuestionario.findByPk(req.params.id);
    if (puntaje) {
      await puntaje.destroy();
      res.json({ message: 'Puntaje eliminado' });
    } else {
      res.status(404).json({ error: 'Puntaje no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};