const express = require('express');
const router = express.Router();
const cursoController = require('../../controllers/cursoController.js');

// Rutas que no requieren autenticación
router.get('/', cursoController.getAllCursos);
router.get('/:id', cursoController.getCursoById);
router.get('/clavepucv/:clave', cursoController.getCursosByClavePucv);

module.exports = router;