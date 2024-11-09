const express = require('express');
const router = express.Router();
const calculadoraController = require('../../controllers/calculadoraController.js');

// Rutas que no requieren autenticación
router.get('/', calculadoraController.getAllCalculadoras);
router.get('/:id', calculadoraController.getCalculadoraById);
router.get('/clavepucv/:id', calculadoraController.getCalculadorasByClavePucv);

module.exports = router;