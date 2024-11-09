const express = require('express');
const router = express.Router();
const respuestaController = require('../../controllers/respuestaController.js');

// Rutas que no requieren autenticación
router.get('/', respuestaController.getAllRespuestas);
router.get('/:id', respuestaController.getRespuestaById);
router.get('/pregunta/:id', respuestaController.getRespuestasByPreguntaId);
router.get('/clavepucv/:clave', respuestaController.getRespuestasByClavePucv);

module.exports = router;