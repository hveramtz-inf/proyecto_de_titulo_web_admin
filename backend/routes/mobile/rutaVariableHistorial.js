const express = require('express');
const router = express.Router();
const variableHistorialController = require('../../controllers/variableHistorialController.js');

// Rutas que no requieren autenticación
router.get('/', variableHistorialController.getAllVariablesHistorial);
router.get('/:id', variableHistorialController.getVariableHistorialById);
router.get('/historial/:idhistorial', variableHistorialController.getVariablesHistorialByHistorialId);
router.post('/', variableHistorialController.createVariableHistorial);
router.put('/:id', variableHistorialController.updateVariableHistorial);
router.delete('/:id', variableHistorialController.deleteVariableHistorial);

module.exports = router;