const express = require('express');
const router = express.Router();
const cuestionarioController = require('../../controllers/cuestionariosController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, cuestionarioController.getAllCuestionarios);
router.get('/:id',verifyToken, cuestionarioController.getCuestionarioById);
router.get('/estudiante/:idestudiante',verifyToken, cuestionarioController.getCuestionariosByEstudianteId);
router.get('/clavepucv/:clavepucv',verifyToken, cuestionarioController.getCuestionariosByClavePucv);

// Rutas que requieren autenticación
router.post('/', verifyToken, cuestionarioController.createCuestionario);
router.put('/:id', verifyToken, cuestionarioController.updateCuestionario);
router.delete('/:id', verifyToken, cuestionarioController.deleteCuestionario);


module.exports = router;