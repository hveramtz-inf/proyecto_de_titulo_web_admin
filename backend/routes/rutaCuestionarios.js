const cuestionario = require('../models/CuestionariosModel.js');
const express = require('express');
const router = express.Router();


// Create a new cuestionario
router.post('/', async (req, res) => {
    try {
        const newCuestionario = new cuestionario(req.body);
        const savedCuestionario = await newCuestionario.save();
        res.status(201).json(savedCuestionario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all cuestionarios
router.get('/', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findAll();
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single cuestionario by ID
router.get('/:id', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.findByPk(req.params.id);
        if (!cuestionarios) return res.status(404).json({ message: 'Cuestionario not found' });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/curso/:idcurso', async (req, res) => {
    try {
        const cuestionarios = await cuestionario.find({ idcurso: req.params.idcurso });
        res.json(cuestionarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Update a cuestionario by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCuestionario = await cuestionario.findByPk(req.params.id, req.body, { new: true });
        if (!updatedCuestionario) return res.status(404).json({ message: 'Cuestionario not found' });
        res.json(updatedCuestionario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a cuestionario by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCuestionario = await cuestionario.findByIdAndDelete(req.params.id);
        if (!deletedCuestionario) return res.status(404).json({ message: 'Cuestionario not found' });
        res.json({ message: 'Cuestionario deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;