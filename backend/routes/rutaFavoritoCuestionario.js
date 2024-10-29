const express = require('express');
const FavoritosCuestionario = require('../models/FavoritosCuestionarioModel');

const router = express.Router();

// Get all favoritos cuestionarios
router.get('/', async (req, res) => {
    try {
        const favoritos = await FavoritosCuestionario.findAll();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favoritos cuestionarios' });
    }
});

// Get a single favorito cuestionario by ID
router.get('/:id', async (req, res) => {
    try {
        const favorito = await FavoritosCuestionario.findByPk(req.params.id);
        if (favorito) {
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorito cuestionario not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorito cuestionario' });
    }
});

// Get all favoritos cuestionarios by estudiante ID
router.get('/estudiante/:id', async (req, res) => {
    try {
        const favoritos = await FavoritosCuestionario.findAll({ where: { idestudiante: req.params.id } });
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favoritos cuestionarios' });
    }
});

// Create a new favorito cuestionario
router.post('/', async (req, res) => {
    try {
        const nuevoFavorito = await FavoritosCuestionario.create(req.body);
        res.status(201).json(nuevoFavorito);
    } catch (error) {
        res.status(500).json({ error: 'Error creating favorito cuestionario' });
    }
});

// Update a favorito cuestionario by ID
router.put('/:id', async (req, res) => {
    try {
        const favorito = await FavoritosCuestionario.findByPk(req.params.id);
        if (favorito) {
            await favorito.update(req.body);
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorito cuestionario not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating favorito cuestionario' });
    }
});

// Delete a favorito cuestionario by ID
router.delete('/:id', async (req, res) => {
    try {
        const favorito = await FavoritosCuestionario.findByPk(req.params.id);
        if (favorito) {
            await favorito.destroy();
            res.json({ message: 'Favorito cuestionario deleted' });
        } else {
            res.status(404).json({ error: 'Favorito cuestionario not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting favorito cuestionario' });
    }
});

module.exports = router;