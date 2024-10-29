const express = require('express');
const FavoritosCalculadora = require('../models/FavoritosCalculadoraModel');

const router = express.Router();

// Get all favorite calculators
router.get('/', async (req, res) => {
    try {
        const favoritos = await FavoritosCalculadora.findAll();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorite calculators' });
    }
});

router.get('/estudiante/:id', async (req, res) => {
    try {
        const favoritos = await FavoritosCalculadora.findAll({ where: { idestudiante: req.params.id } });
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorite calculators' });
    }
});

// Get a favorite calculator by ID
router.get('/:id', async (req, res) => {
    try {
        const favorito = await FavoritosCalculadora.findByPk(req.params.id);
        if (favorito) {
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorite calculator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorite calculator' });
    }
});

// Add a new favorite calculator
router.post('/', async (req, res) => {
    try {
        const { idestudiante, idcalculadora } = req.body;
        const newFavorito = await FavoritosCalculadora.create({ idestudiante, idcalculadora });
        res.status(201).json(newFavorito);
    } catch (error) {
        res.status(500).json({ error: 'Error adding favorite calculator' });
    }
});

// Update a favorite calculator
router.put('/:id', async (req, res) => {
    try {
        const { idestudiante, idcalculadora } = req.body;
        const favorito = await FavoritosCalculadora.findByPk(req.params.id);
        if (favorito) {
            favorito.idestudiante = idestudiante;
            favorito.idcalculadora = idcalculadora;
            await favorito.save();
            res.json(favorito);
        } else {
            res.status(404).json({ error: 'Favorite calculator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating favorite calculator' });
    }
});

// Delete a favorite calculator
router.delete('/:id', async (req, res) => {
    try {
        const favorito = await FavoritosCalculadora.findByPk(req.params.id);
        if (favorito) {
            await favorito.destroy();
            res.json({ message: 'Favorite calculator deleted' });
        } else {
            res.status(404).json({ error: 'Favorite calculator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting favorite calculator' });
    }
});

module.exports = router;