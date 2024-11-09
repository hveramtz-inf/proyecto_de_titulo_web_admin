const express = require('express');
const router = express.Router();
const cuestionarioController = require('../../controllers/cuestionariosController.js');

// Rutas que no requieren autenticación
router.get('/', cuestionarioController.getAllCuestionarios);
router.get('/:id', cuestionarioController.getCuestionarioById);
router.get('/estudiante/:idestudiante', cuestionarioController.getCuestionariosByEstudianteId);
router.get('/clavepucv/:clavepucv', cuestionarioController.getCuestionariosByClavePucv);

module.exports = router;