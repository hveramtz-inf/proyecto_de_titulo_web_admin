const express = require('express');
const router = express.Router();
const estudianteController = require('../../controllers/estudianteController.js');
const tokenVerifier = require('../verifyTokenRoute.js');

// Rutas que no requieren autenticación
router.get('/', estudianteController.getAllEstudiantes);
router.get('/:id', estudianteController.getEstudianteById);
router.post('/iniciarSesion', estudianteController.iniciarSesion);
router.post('/',tokenVerifier, estudianteController.createEstudiante);
router.put('/:id',tokenVerifier, estudianteController.updateEstudiante);
router.delete('/:id',tokenVerifier, estudianteController.deleteEstudiante);

module.exports = router;