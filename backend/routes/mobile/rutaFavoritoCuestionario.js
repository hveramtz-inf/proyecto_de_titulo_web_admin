const express = require('express');
const router = express.Router();
const favoritoCuestionarioController = require('../../controllers/favoritoCuestionarioController.js');

// Rutas que no requieren autenticación
router.get('/', favoritoCuestionarioController.getAllFavoritosCuestionario);
router.get('/estudiante/:id', favoritoCuestionarioController.getFavoritosCuestionarioByEstudianteId);
router.get('/:id', favoritoCuestionarioController.getFavoritoCuestionarioById);
router.post('/', favoritoCuestionarioController.createFavoritoCuestionario);
router.put('/:id', favoritoCuestionarioController.updateFavoritoCuestionario);
router.delete('/:id', favoritoCuestionarioController.deleteFavoritoCuestionario);

module.exports = router;