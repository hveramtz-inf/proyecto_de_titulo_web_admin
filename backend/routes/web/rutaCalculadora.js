const express = require('express');
const router = express.Router();
const calculadoraController = require('../../controllers/calculadoraController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, calculadoraController.getAllCalculadoras);
router.get('/:id',verifyToken, calculadoraController.getCalculadoraById);
router.get('/clavepucv/:id',verifyToken, calculadoraController.getCalculadorasByClavePucv);

// Rutas que requieren autenticación
router.post('/', verifyToken, calculadoraController.createCalculadora);
router.put('/:id', verifyToken, calculadoraController.updateCalculadora);
router.delete('/:id', verifyToken, calculadoraController.deleteCalculadora);

module.exports = router;