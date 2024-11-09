const ClavePucv = require('../models/clavePucvModel.js');
const Curso = require('../models/CursoModel.js');
const Seccion = require('../models/SeccionesModel.js');
const Cuestionario = require('../models/CuestionariosModel.js');
const PreguntaCuestionario = require('../models/PreguntaCuestionarioModel.js');
const RespuestaCuestionario = require('../models/RespuestaCuestionarioModel.js');
const Apunte = require('../models/ApunteModel.js');
const FavoritosCuestionario = require('../models/FavoritosCuestionarioModel.js');
const PuntajeCuestionario = require('../models/PuntajeCuestionarioModel.js');
const SeccionRevisada = require('../models/SeccionRevisadaModel.js');
const ProgresoCurso = require('../models/ProgesoCursoModel.js');
const Calculadora = require('../models/CalculadoraModel.js');
const FavoritosCalculadora = require('../models/FavoritosCalculadoraModel.js');
const HistorialCalculadora = require('../models/HistorialModel.js');
const VariableHistorial = require('../models/VariableHistorialModel.js');
const { Op } = require('sequelize');

// Obtener todas las claves PUCV
exports.getAllClavesPucv = async (req, res) => {
  try {
    const claves = await ClavePucv.findAll();
    res.json(claves);
  } catch (err) {
    console.error('Error al obtener las claves PUCV', err);
    res.status(500).json({ error: 'Error al obtener las claves PUCV' });
  }
};

// Obtener una clave PUCV por ID
exports.getClavePucvById = async (req, res) => {
  try {
    const clave = await ClavePucv.findByPk(req.params.id);
    if (clave) {
      res.json(clave);
    } else {
      res.status(404).json({ error: 'Clave PUCV no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la clave PUCV', err);
    res.status(500).json({ error: 'Error al obtener la clave PUCV' });
  }
};

// Obtener claves PUCV por docente
exports.getClavesPucvByDocente = async (req, res) => {
  try {
    const claves = await ClavePucv.findAll({
      where: { iddocente: req.params.idDocente }
    });
    res.json(claves);
  } catch (err) {
    console.error('Error al obtener las claves PUCV', err);
    res.status(500).json({ error: 'Error al obtener las claves PUCV' });
  }
};

// Crear una nueva clave PUCV (requiere autenticación)
exports.createClavePucv = async (req, res) => {
  const transaction = await ClavePucv.sequelize.transaction();
  const startTime = Date.now();
  try {
    const { clave, ...rest } = req.body; // Asegúrate de que el campo clave esté en el cuerpo de la solicitud
    console.log('Iniciando creación de ClavePucv');
    const nuevaClavePucv = await ClavePucv.create({ clave, ...rest }, { transaction });
    console.log('ClavePucv creada:', nuevaClavePucv.id);

    // Crear cursos predeterminados
    for (const cursoData of defaultData.cursos) {
      const nuevoCurso = await Curso.create({
        nombre: cursoData.nombre,
        descripcion: cursoData.descripcion,
        ocultar: cursoData.ocultar,
        clavepucvid: nuevaClavePucv.id
      }, { transaction });
      console.log('Curso creado:', nuevoCurso.id);

      // Crear secciones predeterminadas para cada curso
      for (const seccionData of cursoData.secciones) {
        const nuevaSeccion = await Seccion.create({
          titulo: seccionData.titulo,
          contenido: seccionData.contenido,
          linkvideoyoutube: seccionData.linkvideoyoutube,
          idcurso: nuevoCurso.id
        }, { transaction });
        console.log('Sección creada:', nuevaSeccion.id);

        // Crear cuestionarios predeterminados para cada sección
        for (const cuestionarioData of seccionData.cuestionarios) {
          const nuevoCuestionario = await Cuestionario.create({
            titulo: cuestionarioData.titulo,
            ocultar: cuestionarioData.ocultar,
            idcurso: nuevoCurso.id
          }, { transaction });
          console.log('Cuestionario creado:', nuevoCuestionario.id);

          // Crear preguntas y respuestas predeterminadas para cada cuestionario
          for (const preguntaData of cuestionarioData.preguntas) {
            const nuevaPregunta = await PreguntaCuestionario.create({
              pregunta: preguntaData.pregunta,
              idcuestionario: nuevoCuestionario.id
            }, { transaction });
            console.log('Pregunta creada:', nuevaPregunta.id);

            for (const respuestaData of preguntaData.respuestas) {
              await RespuestaCuestionario.create({
                respuesta: respuestaData,
                valor: respuestaData === preguntaData.respuesta_correcta,
                idpregunta: nuevaPregunta.id
              }, { transaction });
              console.log('Respuesta creada para pregunta:', nuevaPregunta.id);
            }
          }
        }
      }
    }

    // Crear calculadoras predeterminadas
    for (const calculadoraData of defaultData.calculadoras) {
      await Calculadora.create({
        nombre: calculadoraData.nombre,
        formula: calculadoraData.formula,
        latexformula: calculadoraData.latexformula,
        ocultar: calculadoraData.ocultar,
        idclavepucv: nuevaClavePucv.id
      }, { transaction });
      console.log('Calculadora creada:', calculadoraData.nombre);
    }

    await transaction.commit();
    const endTime = Date.now();
    console.log(`Tiempo de ejecución: ${(endTime - startTime) / 1000} segundos`);
    res.status(201).json(nuevaClavePucv);
  } catch (err) {
    await transaction.rollback();
    console.error('Error al crear la clave PUCV', err);
    res.status(500).json({ error: 'Error al crear la clave PUCV' });
  }
};

// Actualizar una clave PUCV por ID (requiere autenticación)
exports.updateClavePucv = async (req, res) => {
  try {
    const [updated] = await ClavePucv.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedClavePucv = await ClavePucv.findByPk(req.params.id);
      res.json(updatedClavePucv);
    } else {
      res.status(404).json({ error: 'Clave PUCV no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la clave PUCV', err);
    res.status(500).json({ error: 'Error al actualizar la clave PUCV' });
  }
};

// Eliminar una clave PUCV por ID (requiere autenticación)
exports.deleteClavePucv = async (req, res) => {
  const { id } = req.params;
  const transaction = await ClavePucv.sequelize.transaction();
  try {
    const startTime = Date.now();

    const cursos = await Curso.findAll({ where: { clavepucvid: id }, transaction });
    const cursoIds = cursos.map(curso => curso.id);

    const secciones = await Seccion.findAll({ where: { idcurso: { [Op.in]: cursoIds } }, transaction });
    const seccionIds = secciones.map(seccion => seccion.id);

    const cuestionarios = await Cuestionario.findAll({ where: { idcurso: { [Op.in]: cursoIds } }, transaction });
    const cuestionarioIds = cuestionarios.map(cuestionario => cuestionario.id);

    const preguntas = await PreguntaCuestionario.findAll({ where: { idcuestionario: { [Op.in]: cuestionarioIds } }, transaction });
    const preguntaIds = preguntas.map(pregunta => pregunta.id);

    const calculadoras = await Calculadora.findAll({ where: { idclavepucv: id }, transaction });
    const calculadoraIds = calculadoras.map(calculadora => calculadora.id);

    // Eliminar registros en el orden correcto usando bulkDelete
    await RespuestaCuestionario.destroy({ where: { idpregunta: { [Op.in]: preguntaIds } }, transaction });
    await PreguntaCuestionario.destroy({ where: { id: { [Op.in]: preguntaIds } }, transaction });
    await FavoritosCuestionario.destroy({ where: { idcuestionario: { [Op.in]: cuestionarioIds } }, transaction });
    await PuntajeCuestionario.destroy({ where: { idcuestionario: { [Op.in]: cuestionarioIds } }, transaction });
    await Cuestionario.destroy({ where: { id: { [Op.in]: cuestionarioIds } }, transaction });
    await Apunte.destroy({ where: { seccionid: { [Op.in]: seccionIds } }, transaction });
    await SeccionRevisada.destroy({ where: { idseccion: { [Op.in]: seccionIds } }, transaction });
    await Seccion.destroy({ where: { id: { [Op.in]: seccionIds } }, transaction });
    await ProgresoCurso.destroy({ where: { idcurso: { [Op.in]: cursoIds } }, transaction });
    await Curso.destroy({ where: { id: { [Op.in]: cursoIds } }, transaction });
    await FavoritosCalculadora.destroy({ where: { idcalculadora: { [Op.in]: calculadoraIds } }, transaction });
    await HistorialCalculadora.destroy({ where: { idcalculadora: { [Op.in]: calculadoraIds } }, transaction });
    await VariableHistorial.destroy({ where: { idhistorial: { [Op.in]: calculadoraIds } }, transaction });
    await Calculadora.destroy({ where: { id: { [Op.in]: calculadoraIds } }, transaction });
    await ClavePucv.destroy({ where: { id }, transaction });

    console.log('ClavePucv eliminada:', id);

    await transaction.commit();
    const endTime = Date.now();
    console.log(`Tiempo de ejecución: ${(endTime - startTime) / 1000} segundos`);
    res.status(204).json();
  } catch (err) {
    await transaction.rollback();
    console.error('Error al eliminar la clave PUCV y sus relaciones', err);
    res.status(500).json({ error: 'Error al eliminar la clave PUCV y sus relaciones' });
  }
};