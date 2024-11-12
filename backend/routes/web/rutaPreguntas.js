const express = require('express');
const router = express.Router();
const preguntaController = require('../../controllers/preguntaController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, preguntaController.getAllPreguntas);
router.get('/:id',verifyToken, preguntaController.getPreguntaById);
router.get('/cuestionario/:id',verifyToken, preguntaController.getPreguntasByCuestionarioId);

// Rutas que requieren autenticación
router.post('/', verifyToken, preguntaController.createPregunta);
router.put('/:id', verifyToken, preguntaController.updatePregunta);
router.delete('/:id', verifyToken, preguntaController.deletePregunta);

module.exports = router;