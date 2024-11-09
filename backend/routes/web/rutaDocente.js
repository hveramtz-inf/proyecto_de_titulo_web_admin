const express = require('express');
const router = express.Router();
const docenteController = require('../../controllers/docenteController.js');

// Rutas que no requieren autenticación
router.get('/', docenteController.getAllDocentes);
router.get('/:id', docenteController.getDocenteById);
router.post('/iniciosesion', docenteController.iniciarSesion);
router.post('/', docenteController.createDocente);
router.put('/:id', docenteController.updateDocente);
router.delete('/:id', docenteController.deleteDocente);

module.exports = router;