const express = require('express');
const router = express.Router();
const respuestaController = require('../../controllers/respuestaController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, respuestaController.getAllRespuestas);
router.get('/:id',verifyToken, respuestaController.getRespuestaById);
router.get('/pregunta/:id',verifyToken, respuestaController.getRespuestasByPreguntaId);
router.get('/clavepucv/:clave',verifyToken, respuestaController.getRespuestasByClavePucv);

// Rutas que requieren autenticación
router.post('/', verifyToken, respuestaController.createRespuesta);
router.put('/:id', verifyToken, respuestaController.updateRespuesta);
router.delete('/:id', verifyToken, respuestaController.deleteRespuesta);

module.exports = router;