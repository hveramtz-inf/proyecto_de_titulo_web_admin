const express = require('express');
const router = express.Router();
const clavePucvController = require('../../controllers/clavePucvController.js');

// Rutas que no requieren autenticación
router.get('/', clavePucvController.getAllClavesPucv);
router.get('/:id', clavePucvController.getClavePucvById);

module.exports = router;