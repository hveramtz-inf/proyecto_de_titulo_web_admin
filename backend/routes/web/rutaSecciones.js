const express = require('express');
const router = express.Router();
const seccionController = require('../../controllers/seccionesController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/',verifyToken, seccionController.getAllSecciones);
router.get('/curso/:id',verifyToken, seccionController.getSeccionesByCursoId);
router.get('/:id',verifyToken, seccionController.getSeccionById);

// Rutas que requieren autenticación
router.post('/', verifyToken, seccionController.createSeccion);
router.put('/:id', verifyToken, seccionController.updateSeccion);
router.delete('/:id', verifyToken, seccionController.deleteSeccion);

module.exports = router;