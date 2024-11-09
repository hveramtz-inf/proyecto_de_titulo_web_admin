const Cuestionario = require('../models/CuestionariosModel.js');
const Curso = require('../models/CursoModel.js');
const PreguntaCuestionario = require('../models/PreguntaCuestionarioModel.js');
const RespuestaCuestionario = require('../models/RespuestaCuestionarioModel.js');

// Obtener todos los cuestionarios
exports.getAllCuestionarios = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.findAll();
    res.json(cuestionarios);
  } catch (err) {
    console.error('Error al obtener los cuestionarios', err);
    res.status(500).json({ message: 'Error al obtener los cuestionarios' });
  }
};

// Obtener un cuestionario por ID
exports.getCuestionarioById = async (req, res) => {
  try {
    const cuestionario = await Cuestionario.findByPk(req.params.id);
    if (cuestionario) {
      res.json(cuestionario);
    } else {
      res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el cuestionario', err);
    res.status(500).json({ message: 'Error al obtener el cuestionario' });
  }
};

// Obtener cuestionarios por estudiante ID
exports.getCuestionariosByEstudianteId = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.findAll({ where: { idestudiante: req.params.idestudiante } });
    res.json(cuestionarios);
  } catch (err) {
    console.error('Error al obtener los cuestionarios', err);
    res.status(500).json({ message: 'Error al obtener los cuestionarios' });
  }
};

// Obtener cuestionarios por clave PUCV
exports.getCuestionariosByClavePucv = async (req, res) => {
  try {
    const cursos = await Curso.findAll({ where: { clavepucvid: req.params.clavepucv } });
    const cursoIds = cursos.map(curso => curso.id);

    if (cursoIds.length === 0) {
      return res.json([]); // Si no hay cursos, devolver un array vacío
    }

    const cuestionarios = await Cuestionario.findAll({ where: { idcurso: cursoIds } });
    res.json(cuestionarios);
  } catch (err) {
    console.error('Error al obtener los cuestionarios', err);
    res.status(500).json({ message: 'Error al obtener los cuestionarios' });
  }
};

// Crear un nuevo cuestionario (requiere autenticación)
exports.createCuestionario = async (req, res) => {
  try {
    const nuevoCuestionario = await Cuestionario.create(req.body);
    res.status(201).json(nuevoCuestionario);
  } catch (err) {
    console.error('Error al crear el cuestionario', err);
    res.status(500).json({ message: 'Error al crear el cuestionario' });
  }
};

// Actualizar un cuestionario por ID (requiere autenticación)
exports.updateCuestionario = async (req, res) => {
  try {
    const [updated] = await Cuestionario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCuestionario = await Cuestionario.findByPk(req.params.id);
      res.json(updatedCuestionario);
    } else {
      res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el cuestionario', err);
    res.status(500).json({ message: 'Error al actualizar el cuestionario' });
  }
};

// Eliminar un cuestionario por ID (requiere autenticación)
exports.deleteCuestionario = async (req, res) => {
  const { id } = req.params;
  const transaction = await Cuestionario.sequelize.transaction();
  try {
    // Eliminar respuestas asociadas a las preguntas del cuestionario
    const preguntas = await PreguntaCuestionario.findAll({ where: { idcuestionario: id }, transaction });
    for (const pregunta of preguntas) {
      await RespuestaCuestionario.destroy({ where: { idpregunta: pregunta.id }, transaction });
    }

    // Eliminar preguntas asociadas al cuestionario
    await PreguntaCuestionario.destroy({ where: { idcuestionario: id }, transaction });

    // Eliminar el cuestionario
    const deleted = await Cuestionario.destroy({ where: { id }, transaction });

    if (deleted) {
      await transaction.commit();
      res.status(204).json({ message: 'Cuestionario eliminado correctamente' });
    } else {
      await transaction.rollback();
      res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
  } catch (err) {
    await transaction.rollback();
    console.error('Error al eliminar el cuestionario', err);
    res.status(500).json({ message: 'Error al eliminar el cuestionario' });
  }
};