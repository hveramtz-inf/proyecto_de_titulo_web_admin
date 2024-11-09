const CursoModel = require('../models/CursoModel.js');
const SeccionModel = require('../models/SeccionesModel.js');
const CuestionarioModel = require('../models/CuestionariosModel.js');
const PreguntaModel = require('../models/PreguntaCuestionarioModel.js');
const RespuestaCuestionario = require('../models/RespuestaCuestionarioModel.js');
const ApunteModel = require('../models/ApunteModel.js');
const FavoritosCuestionario = require('../models/FavoritosCuestionarioModel.js');
const PuntajeCuestionario = require('../models/PuntajeCuestionarioModel.js');
const SeccionRevisada = require('../models/SeccionRevisadaModel.js');
const ProgresoCurso = require('../models/ProgesoCursoModel.js');

// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await CursoModel.findAll();
    res.json(cursos);
  } catch (err) {
    console.error('Error al obtener los cursos', err);
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

// Obtener un curso por ID
exports.getCursoById = async (req, res) => {
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
};

// Obtener cursos por clave PUCV
exports.getCursosByClavePucv = async (req, res) => {
  try {
    const cursos = await CursoModel.findAll({
      where: { clavepucvid: req.params.clave }
    });
    if (cursos.length > 0) {
      res.json(cursos);
    } else {
      res.status(404).json({ error: 'Cursos no encontrados' });
    }
  } catch (err) {
    console.error('Error al obtener los cursos', err);
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

// Crear un nuevo curso (requiere autenticación)
exports.createCurso = async (req, res) => {
  try {
    const nuevoCurso = await CursoModel.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (err) {
    console.error('Error al crear el curso', err);
    res.status(500).json({ error: 'Error al crear el curso' });
  }
};

// Actualizar un curso por ID (requiere autenticación)
exports.updateCurso = async (req, res) => {
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
};

// Eliminar un curso por ID (requiere autenticación)
exports.deleteCurso = async (req, res) => {
  const { id } = req.params;
  const transaction = await CursoModel.sequelize.transaction();
  try {
    // Lógica para eliminar el curso y sus relaciones
    const cuestionarios = await CuestionarioModel.findAll({
      where: { idcurso: id },
      transaction
    });

    for (const cuestionario of cuestionarios) {
      const preguntas = await PreguntaModel.findAll({
        where: { idcuestionario: cuestionario.id },
        transaction
      });

      for (const pregunta of preguntas) {
        await RespuestaCuestionario.destroy({
          where: { idpregunta: pregunta.id },
          transaction
        });
      }

      await PreguntaModel.destroy({
        where: { idcuestionario: cuestionario.id },
        transaction
      });

      await FavoritosCuestionario.destroy({
        where: { idcuestionario: cuestionario.id },
        transaction
      });
      await PuntajeCuestionario.destroy({
        where: { idcuestionario: cuestionario.id },
        transaction
      });
    }

    await CuestionarioModel.destroy({
      where: { idcurso: id },
      transaction
    });

    const secciones = await SeccionModel.findAll({
      where: { idcurso: id },
      transaction
    });

    for (const seccion of secciones) {
      await ApunteModel.destroy({
        where: { seccionid: seccion.id },
        transaction
      });
      await SeccionRevisada.destroy({
        where: { idseccion: seccion.id },
        transaction
      });
    }

    await SeccionModel.destroy({
      where: { idcurso: id },
      transaction
    });

    await ProgresoCurso.destroy({
      where: { idcurso: id },
      transaction
    });

    const deleted = await CursoModel.destroy({
      where: { id },
      transaction
    });

    if (deleted) {
      await transaction.commit();
      res.status(204).json({ message: 'Curso eliminado correctamente' });
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    await transaction.rollback();
    console.error('Error al eliminar el curso y sus relaciones', err);
    res.status(500).json({ error: 'Error al eliminar el curso y sus relaciones' });
  }
};