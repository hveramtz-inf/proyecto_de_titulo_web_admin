const express = require('express');
const router = express.Router();
const apunteController = require('../../controllers/apunteController.js');

// Rutas que no requieren autenticación
router.get('/', apunteController.getAllApuntes);
router.get('/:id', apunteController.getApunteById);
router.get('/estudiante/:idestudiante/seccion/:idseccion', apunteController.getApunteByEstudianteAndSeccion);
router.post('/', apunteController.createApunte);
router.put('/:id', apunteController.updateApunte);
router.delete('/:id', apunteController.deleteApunte);

module.exports = router;