const express = require('express');
const router = express.Router();
const progresoCursoController = require('../../controllers/progresoCursoController.js');

// Rutas que no requieren autenticación
router.get('/', progresoCursoController.getAllProgresoCurso);
router.get('/:id', progresoCursoController.getProgresoCursoById);
router.get('/estudiante/:id', progresoCursoController.getProgresoCursoByEstudianteId);
router.post('/', progresoCursoController.createProgresoCurso);
router.put('/:id', progresoCursoController.updateProgresoCurso);
router.delete('/:id', progresoCursoController.deleteProgresoCurso);

module.exports = router;