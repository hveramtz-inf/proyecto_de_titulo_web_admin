const ApunteModel = require('../models/ApunteModel.js');

// Obtener todos los apuntes
exports.getAllApuntes = async (req, res) => {
  try {
    const apuntes = await ApunteModel.findAll();
    res.json(apuntes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un apunte por ID
exports.getApunteById = async (req, res) => {
  try {
    const apunte = await ApunteModel.findByPk(req.params.id);
    if (apunte) {
      res.json(apunte);
    } else {
      res.status(404).json({ message: 'Apunte no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un apunte por estudiante y sección
exports.getApunteByEstudianteAndSeccion = async (req, res) => {
  try {
    const apunte = await ApunteModel.findOne({
      where: {
        idestudiante: req.params.idestudiante,
        seccionid: req.params.idseccion
      }
    });
    if (apunte) {
      res.json(apunte);
    } else {
      res.status(404).json({ message: 'Apunte no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo apunte
exports.createApunte = async (req, res) => {
  try {
    const nuevoApunte = await ApunteModel.create(req.body);
    res.status(201).json(nuevoApunte);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un apunte por ID
exports.updateApunte = async (req, res) => {
  try {
    const apunte = await ApunteModel.findByPk(req.params.id);
    if (apunte) {
      await apunte.update(req.body);
      res.json(apunte);
    } else {
      res.status(404).json({ message: 'Apunte no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un apunte por ID
exports.deleteApunte = async (req, res) => {
  try {
    const apunte = await ApunteModel.findByPk(req.params.id);
    if (apunte) {
      await apunte.destroy();
      res.json({ message: 'Apunte eliminado' });
    } else {
      res.status(404).json({ message: 'Apunte no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};