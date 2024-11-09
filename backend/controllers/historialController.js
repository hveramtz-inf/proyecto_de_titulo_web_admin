const HistorialCalculadora = require('../models/HistorialModel.js');

// Obtener todas las entradas de historial
exports.getAllHistoriales = async (req, res) => {
  try {
    const historiales = await HistorialCalculadora.findAll();
    res.json(historiales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una entrada de historial por ID
exports.getHistorialById = async (req, res) => {
  try {
    const historial = await HistorialCalculadora.findByPk(req.params.id);
    if (historial) {
      res.json(historial);
    } else {
      res.status(404).json({ message: 'Historial no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener entradas de historial por calculadora y estudiante
exports.getHistorialByCalculadoraAndEstudiante = async (req, res) => {
  try {
    const historial = await HistorialCalculadora.findAll({
      where: {
        idcalculadora: req.params.idcalculadora,
        idestudiante: req.params.idestudiante
      }
    });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva entrada de historial
exports.createHistorial = async (req, res) => {
  try {
    const nuevoHistorial = await HistorialCalculadora.create(req.body);
    res.status(201).json(nuevoHistorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una entrada de historial por ID
exports.updateHistorial = async (req, res) => {
  try {
    const historial = await HistorialCalculadora.findByPk(req.params.id);
    if (historial) {
      await historial.update(req.body);
      res.json(historial);
    } else {
      res.status(404).json({ message: 'Historial no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar una entrada de historial por ID
exports.deleteHistorial = async (req, res) => {
  try {
    const historial = await HistorialCalculadora.findByPk(req.params.id);
    if (historial) {
      await historial.destroy();
      res.json({ message: 'Historial eliminado' });
    } else {
      res.status(404).json({ message: 'Historial no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};