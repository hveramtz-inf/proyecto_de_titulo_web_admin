const express = require('express');
const router = express.Router();
const puntajeCuestionarioController = require('../../controllers/puntajeCuestionarioController.js');

// Rutas que no requieren autenticación
router.get('/', puntajeCuestionarioController.getAllPuntajes);
router.get('/:id', puntajeCuestionarioController.getPuntajeById);
router.get('/estudiante/:idestudiante', puntajeCuestionarioController.getPuntajesByEstudianteId);
router.post('/', puntajeCuestionarioController.createPuntaje);
router.put('/:id', puntajeCuestionarioController.updatePuntaje);
router.delete('/:id', puntajeCuestionarioController.deletePuntaje);

module.exports = router;