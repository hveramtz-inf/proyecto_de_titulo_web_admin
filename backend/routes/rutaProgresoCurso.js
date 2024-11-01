const express = require('express');
const ProgresoCurso = require('../models/ProgesoCursoModel');

const router = express.Router();

// Get all progress
router.get('/', async (req, res) => {
    try {
        const progress = await ProgresoCurso.findAll();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get progress by ID
router.get('/:id', async (req, res) => {
    try {
        const progress = await ProgresoCurso.findByPk(req.params.id);
        if (progress) {
            res.json(progress);
        } else {
            res.status(404).json({ error: 'Progress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get progress by student ID
router.get('/estudiante/:id', async (req, res) => {
    try {
        const progress = await ProgresoCurso.findAll({
            where: {
                idestudiante: req.params.id
            }
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new progress
router.post('/', async (req, res) => {
    try {
        const newProgress = await ProgresoCurso.create(req.body);
        res.status(201).json(newProgress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update progress by ID
router.put('/:id', async (req, res) => {
    try {
        const progress = await ProgresoCurso.findByPk(req.params.id);
        if (progress) {
            await progress.update(req.body);
            res.json(progress);
        } else {
            res.status(404).json({ error: 'Progress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete progress by ID
router.delete('/:id', async (req, res) => {
    try {
        const progress = await ProgresoCurso.findByPk(req.params.id);
        if (progress) {
            await progress.destroy();
            res.json({ message: 'Progress deleted' });
        } else {
            res.status(404).json({ error: 'Progress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;