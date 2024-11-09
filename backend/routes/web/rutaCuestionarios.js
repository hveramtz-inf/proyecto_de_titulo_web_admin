const express = require('express');
const router = express.Router();
const cuestionarioController = require('../../controllers/cuestionariosController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/', cuestionarioController.getAllCuestionarios);
router.get('/:id', cuestionarioController.getCuestionarioById);
router.get('/estudiante/:idestudiante', cuestionarioController.getCuestionariosByEstudianteId);
router.get('/clavepucv/:clavepucv', cuestionarioController.getCuestionariosByClavePucv);

// Rutas que requieren autenticación
router.post('/', verifyToken, cuestionarioController.createCuestionario);
router.put('/:id', verifyToken, cuestionarioController.updateCuestionario);
router.delete('/:id', verifyToken, cuestionarioController.deleteCuestionario);


module.exports = router;