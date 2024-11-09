const express = require('express');
const router = express.Router();
const historialController = require('../../controllers/historialController.js');

// Rutas que no requieren autenticación
router.get('/', historialController.getAllHistoriales);
router.get('/:id', historialController.getHistorialById);
router.get('/calculadora/:idcalculadora/estudiante/:idestudiante', historialController.getHistorialByCalculadoraAndEstudiante);
router.post('/', historialController.createHistorial);
router.put('/:id', historialController.updateHistorial);
router.delete('/:id', historialController.deleteHistorial);

module.exports = router;