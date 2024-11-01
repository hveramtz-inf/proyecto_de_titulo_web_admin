const express = require('express');
const SeccionRevisada = require('../models/SeccionRevisadaModel');

const router = express.Router();

// Get all SeccionRevisada
router.get('/', async (req, res) => {
    try {
        const seccionesRevisadas = await SeccionRevisada.findAll();
        res.json(seccionesRevisadas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get SeccionRevisada by ID
router.get('/:id', async (req, res) => {
    try {
        const seccionRevisada = await SeccionRevisada.findByPk(req.params.id);
        if (seccionRevisada) {
            res.json(seccionRevisada);
        } else {
            res.status(404).json({ error: 'SeccionRevisada not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/estudiante/:id/seccion/:idseccion', async (req, res) => {
    try {
        const seccionRevisada = await SeccionRevisada.findAll({
            where: {
                idestudiante: req.params.id,
                idseccion: req.params.idseccion
            }
        });
        res.json(seccionRevisada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new SeccionRevisada
router.post('/', async (req, res) => {
    try {
        const newSeccionRevisada = await SeccionRevisada.create(req.body);
        res.status(201).json(newSeccionRevisada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update SeccionRevisada by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await SeccionRevisada.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSeccionRevisada = await SeccionRevisada.findByPk(req.params.id);
            res.json(updatedSeccionRevisada);
        } else {
            res.status(404).json({ error: 'SeccionRevisada not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete SeccionRevisada by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await SeccionRevisada.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'SeccionRevisada not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;