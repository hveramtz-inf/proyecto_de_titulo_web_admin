const express = require('express');
const router = express.Router();
const preguntaController = require('../../controllers/preguntaController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/', preguntaController.getAllPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.get('/cuestionario/:id', preguntaController.getPreguntasByCuestionarioId);

// Rutas que requieren autenticación
router.post('/', verifyToken, preguntaController.createPregunta);
router.put('/:id', verifyToken, preguntaController.updatePregunta);
router.delete('/:id', verifyToken, preguntaController.deletePregunta);

module.exports = router;