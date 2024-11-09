const express = require('express');
const router = express.Router();
const seccionController = require('../../controllers/seccionesController.js');

// Rutas que no requieren autenticación
router.get('/', seccionController.getAllSecciones);
router.get('/curso/:id', seccionController.getSeccionesByCursoId);
router.get('/:id', seccionController.getSeccionById);

module.exports = router;