const express = require('express');
const router = express.Router();
const favoritoCalculadoraController = require('../../controllers/favoritoCalculadoraController.js');

// Rutas que no requieren autenticación
router.get('/', favoritoCalculadoraController.getAllFavoritosCalculadora);
router.get('/estudiante/:id', favoritoCalculadoraController.getFavoritosCalculadoraByEstudianteId);
router.get('/:id', favoritoCalculadoraController.getFavoritoCalculadoraById);
router.post('/', favoritoCalculadoraController.createFavoritoCalculadora);
router.put('/:id', favoritoCalculadoraController.updateFavoritoCalculadora);
router.delete('/:id', favoritoCalculadoraController.deleteFavoritoCalculadora);

module.exports = router;