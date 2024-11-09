const express = require('express');
const router = express.Router();
const cursoController = require('../../controllers/cursoController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/', cursoController.getAllCursos);
router.get('/:id', cursoController.getCursoById);


// Rutas que requieren autenticación
router.post('/', verifyToken, cursoController.createCurso);
router.put('/:id', verifyToken, cursoController.updateCurso);
router.delete('/:id', verifyToken, cursoController.deleteCurso);
router.get('/clavepucv/:clave',verifyToken, cursoController.getCursosByClavePucv);

module.exports = router;