const express = require('express');
const router = express.Router();
const estudianteController = require('../../controllers/estudianteController.js');

// Rutas que no requieren autenticación
router.get('/', estudianteController.getAllEstudiantes);
router.get('/:id', estudianteController.getEstudianteById);
router.post('/iniciarSesion', estudianteController.iniciarSesion);
router.post('/', estudianteController.createEstudiante);
router.put('/:id', estudianteController.updateEstudiante);
router.delete('/:id', estudianteController.deleteEstudiante);

module.exports = router;