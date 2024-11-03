const express = require('express');
const Docente = require('../models/DocenteModel');

const router = express.Router();

// Get all docentes
router.get('/', async (req, res) => {
    try {
        const docentes = await Docente.findAll();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single docente by ID
router.get('/:id', async (req, res) => {
    try {
        const docente = await Docente.findByPk(req.params.id);
        if (docente) {
            res.json(docente);
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/iniciosesion', async (req, res) => {
    try {
        const docente = await Docente.findOne({
            where: {
                rut: req.body.rut,
                contrasenia: req.body.contrasenia
            }
        });
        if (docente) {
            res.json(docente);
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new docente
router.post('/', async (req, res) => {
    try {
        const newDocente = await Docente.create(req.body);
        res.status(201).json(newDocente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an existing docente
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Docente.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDocente = await Docente.findByPk(req.params.id);
            res.json(updatedDocente);
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a docente
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Docente.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;