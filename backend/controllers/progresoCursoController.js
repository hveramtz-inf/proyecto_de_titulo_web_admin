const ProgresoCurso = require('../models/ProgesoCursoModel.js');

// Obtener todo el progreso
exports.getAllProgresoCurso = async (req, res) => {
  try {
    const progreso = await ProgresoCurso.findAll();
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener progreso por ID
exports.getProgresoCursoById = async (req, res) => {
  try {
    const progreso = await ProgresoCurso.findByPk(req.params.id);
    if (progreso) {
      res.json(progreso);
    } else {
      res.status(404).json({ error: 'Progreso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener progreso por ID de estudiante
exports.getProgresoCursoByEstudianteId = async (req, res) => {
  try {
    const progreso = await ProgresoCurso.findAll({
      where: {
        idestudiante: req.params.id
      }
    });
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo progreso
exports.createProgresoCurso = async (req, res) => {
  try {
    const nuevoProgreso = await ProgresoCurso.create(req.body);
    res.status(201).json(nuevoProgreso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un progreso por ID
exports.updateProgresoCurso = async (req, res) => {
  try {
    const progreso = await ProgresoCurso.findByPk(req.params.id);
    if (progreso) {
      await progreso.update(req.body);
      res.json(progreso);
    } else {
      res.status(404).json({ error: 'Progreso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un progreso por ID
exports.deleteProgresoCurso = async (req, res) => {
  try {
    const progreso = await ProgresoCurso.findByPk(req.params.id);
    if (progreso) {
      await progreso.destroy();
      res.json({ message: 'Progreso eliminado' });
    } else {
      res.status(404).json({ error: 'Progreso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};