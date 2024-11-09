const SeccionRevisada = require('../models/SeccionRevisadaModel.js');

// Obtener todas las secciones revisadas
exports.getAllSeccionesRevisadas = async (req, res) => {
  try {
    const seccionesRevisadas = await SeccionRevisada.findAll();
    res.json(seccionesRevisadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una sección revisada por ID
exports.getSeccionRevisadaById = async (req, res) => {
  try {
    const seccionRevisada = await SeccionRevisada.findByPk(req.params.id);
    if (seccionRevisada) {
      res.json(seccionRevisada);
    } else {
      res.status(404).json({ error: 'Sección revisada no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener secciones revisadas por estudiante y sección
exports.getSeccionRevisadaByEstudianteAndSeccion = async (req, res) => {
  try {
    const seccionRevisada = await SeccionRevisada.findAll({
      where: {
        idestudiante: req.params.id,
        idseccion: req.params.idseccion
      }
    });
    res.json(seccionRevisada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva sección revisada
exports.createSeccionRevisada = async (req, res) => {
  try {
    const nuevaSeccionRevisada = await SeccionRevisada.create(req.body);
    res.status(201).json(nuevaSeccionRevisada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una sección revisada por ID
exports.updateSeccionRevisada = async (req, res) => {
  try {
    const seccionRevisada = await SeccionRevisada.findByPk(req.params.id);
    if (seccionRevisada) {
      await seccionRevisada.update(req.body);
      res.json(seccionRevisada);
    } else {
      res.status(404).json({ error: 'Sección revisada no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una sección revisada por ID
exports.deleteSeccionRevisada = async (req, res) => {
  try {
    const seccionRevisada = await SeccionRevisada.findByPk(req.params.id);
    if (seccionRevisada) {
      await seccionRevisada.destroy();
      res.json({ message: 'Sección revisada eliminada' });
    } else {
      res.status(404).json({ error: 'Sección revisada no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};