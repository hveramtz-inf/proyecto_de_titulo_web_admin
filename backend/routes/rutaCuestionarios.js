const cuestionario = require('../models/CuestionariosModel.js');
const PreguntaCuestionarioModel = require('../models/PreguntaCuestionarioModel.js');
const RespuestaCuestionarioModel = require('../models/RespuestaCuestionarioModel.js');
const Curso = require('../models/CursoModel.js');
const Cuestionario = require('../models/CuestionariosModel.js');
const express = require('express');
const router = express.Router();


// Create a new cuestionario
router.post('/', async (req, res) => {
    try {
        const newCuestionario = new cuestionario(req.body);
        const savedCuestionario = await newCuestionario.save();
        res.status(201).json(savedCuestionario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all cuestionarios
router.get('/', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findAll();
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single cuestionario by ID
router.get('/:id', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findByPk(req.params.id);
        if (!cuestionarios) return res.status(404).json({ message: 'Cuestionario not found' });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/estudiante/:idestudiante', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findAll({ idestudiante: req.params.idestudiante });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/clavepucv/:clavepucv', async (req, res) => {
    try {
        const cursos = await Curso.findAll({ where: { clavepucvid: req.params.clavepucv } });
        const cursoIds = cursos.map(curso => curso.id);

        if (cursoIds.length === 0) {
            return res.json([]); // Si no hay cursos, devolver un array vacío
        }

        const cuestionarios = await Cuestionario.findAll({ where: { idcurso: cursoIds } });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/curso/:idcurso', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findAll({ idcurso: req.params.idcurso });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Update a cuestionario by ID
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, ocultar } = req.body;
  
      const cuestionario = await Cuestionario.findByPk(id);
      if (!cuestionario) {
        return res.status(404).json({ error: 'Cuestionario no encontrado' });
      }
  
      cuestionario.titulo = titulo;
      cuestionario.ocultar = ocultar;
  
      await cuestionario.save();
  
      res.json(cuestionario);
    } catch (error) {
      console.error('Error al actualizar el cuestionario:', error);
      res.status(500).json({ error: 'Error al actualizar el cuestionario' });
    }
  });

// Delete a cuestionario by ID
router.delete('/:id', async (req, res) => {
    try {
        const cuestionarioEliminar = await cuestionario.findByPk(req.params.id);

        if (!cuestionarioEliminar) {
            return res.status(404).json({ message: 'Cuestionario not found' });
        }

        // Eliminar preguntas relacionadas con el cuestionario
        const preguntas = await PreguntaCuestionarioModel.findAll({ where: { idcuestionario: req.params.id } });

        for (const pregunta of preguntas) {
            // Eliminar respuestas relacionadas con la pregunta
            await RespuestaCuestionarioModel.destroy({ where: { idpregunta: pregunta.id } });
            await pregunta.destroy();
        }

        await cuestionarioEliminar.destroy();
        res.json({ message: 'Cuestionario and related questions and answers deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;