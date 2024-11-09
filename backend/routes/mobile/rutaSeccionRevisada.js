const express = require('express');
const router = express.Router();
const seccionRevisadaController = require('../../controllers/seccionRevisadaController.js');

// Rutas que no requieren autenticación
router.get('/', seccionRevisadaController.getAllSeccionesRevisadas);
router.get('/:id', seccionRevisadaController.getSeccionRevisadaById);
router.get('/estudiante/:id/seccion/:idseccion', seccionRevisadaController.getSeccionRevisadaByEstudianteAndSeccion);
router.post('/', seccionRevisadaController.createSeccionRevisada);
router.put('/:id', seccionRevisadaController.updateSeccionRevisada);
router.delete('/:id', seccionRevisadaController.deleteSeccionRevisada);

module.exports = router;