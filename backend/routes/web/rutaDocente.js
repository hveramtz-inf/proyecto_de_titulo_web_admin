const express = require('express');
const router = express.Router();
const docenteController = require('../../controllers/docenteController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, docenteController.getAllDocentes);
router.get('/:id',verifyToken, docenteController.getDocenteById);
router.post('/iniciosesion', docenteController.iniciarSesion);
router.post('/',verifyToken, docenteController.createDocente);
router.put('/:id',verifyToken, docenteController.updateDocente);
router.delete('/:id',verifyToken, docenteController.deleteDocente);

module.exports = router;