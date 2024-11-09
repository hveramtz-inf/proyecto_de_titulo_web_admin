const express = require('express');
const router = express.Router();
const docenteController = require('./docenteController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/', docenteController.getAllDocentes);
router.get('/:id', docenteController.getDocenteById);
router.post('/iniciosesion', docenteController.loginDocente);

// Rutas que requieren autenticación
router.post('/', verifyToken, docenteController.createDocente);
router.put('/:id', verifyToken, docenteController.updateDocente);
router.delete('/:id', verifyToken, docenteController.deleteDocente);

module.exports = router;