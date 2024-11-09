const express = require('express');
const router = express.Router();
const preguntaController = require('../../controllers/preguntaController.js');

// Rutas que no requieren autenticación
router.get('/', preguntaController.getAllPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.get('/cuestionario/:id', preguntaController.getPreguntasByCuestionarioId);

module.exports = router;