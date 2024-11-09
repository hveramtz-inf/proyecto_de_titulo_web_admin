const RespuestaCuestionario = require('../models/RespuestaCuestionarioModel.js');
const PreguntaCuestionario = require('../models/PreguntaCuestionarioModel.js');
const Cuestionario = require('../models/CuestionariosModel.js');
const Curso = require('../models/CursoModel.js');

// Obtener todas las respuestas
exports.getAllRespuestas = async (req, res) => {
  try {
    const respuestas = await RespuestaCuestionario.findAll();
    res.json(respuestas);
  } catch (err) {
    console.error('Error al obtener las respuestas', err);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
};

// Obtener una respuesta por ID
exports.getRespuestaById = async (req, res) => {
  try {
    const respuesta = await RespuestaCuestionario.findByPk(req.params.id);
    if (respuesta) {
      res.json(respuesta);
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la respuesta', err);
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
};

// Obtener respuestas por idpregunta
exports.getRespuestasByPreguntaId = async (req, res) => {
  try {
    const respuestas = await RespuestaCuestionario.findAll({
      where: { idpregunta: req.params.id }
    });
    res.json(respuestas);
  } catch (err) {
    console.error('Error al obtener las respuestas', err);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
};

// Obtener respuestas por clave PUCV
exports.getRespuestasByClavePucv = async (req, res) => {
  try {
    const { clave } = req.params;

    // Obtener los cursos que tienen la clave PUCV
    const cursos = await Curso.findAll({
      where: { clavepucvid: clave },
      attributes: ['id'] // Solo necesitamos los IDs de los cursos
    });

    const cursoIds = cursos.map(curso => curso.id);

    // Obtener los cuestionarios que pertenecen a los cursos
    const cuestionarios = await Cuestionario.findAll({
      where: { idcurso: cursoIds },
      attributes: ['id'] // Solo necesitamos los IDs de los cuestionarios
    });

    const cuestionarioIds = cuestionarios.map(cuestionario => cuestionario.id);

    // Obtener las preguntas que pertenecen a los cuestionarios
    const preguntas = await PreguntaCuestionario.findAll({
      where: { idcuestionario: cuestionarioIds },
      attributes: ['id'] // Solo necesitamos los IDs de las preguntas
    });

    const preguntaIds = preguntas.map(pregunta => pregunta.id);

    // Obtener las respuestas que pertenecen a las preguntas
    const respuestas = await RespuestaCuestionario.findAll({
      where: { idpregunta: preguntaIds }
    });

    res.json(respuestas);
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
};

// Crear una nueva respuesta (requiere autenticación)
exports.createRespuesta = async (req, res) => {
  try {
    const nuevaRespuesta = await RespuestaCuestionario.create(req.body);
    res.status(201).json(nuevaRespuesta);
  } catch (err) {
    console.error('Error al crear la respuesta', err);
    res.status(500).json({ error: 'Error al crear la respuesta' });
  }
};

// Actualizar una respuesta por ID (requiere autenticación)
exports.updateRespuesta = async (req, res) => {
  try {
    const [updated] = await RespuestaCuestionario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRespuesta = await RespuestaCuestionario.findByPk(req.params.id);
      res.status(200).json(updatedRespuesta);
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la respuesta', err);
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
};

// Eliminar una respuesta por ID (requiere autenticación)
exports.deleteRespuesta = async (req, res) => {
  try {
    const deleted = await RespuestaCuestionario.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Respuesta eliminada' });
    } else {
      res.status(404).json({ error: 'Respuesta no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar la respuesta', err);
    res.status(500).json({ error: 'Error al eliminar la respuesta' });
  }
};