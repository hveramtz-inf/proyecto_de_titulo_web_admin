const express = require('express');
const HistorialCalculadora = require('../models/HistorialModel');

const router = express.Router();

// GET all historial entries
router.get('/', async (req, res) => {
    try {
        const historiales = await HistorialCalculadora.findAll();
        res.json(historiales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const historial = await HistorialCalculadora.findByPk(req.params.id);
        res.json(historial);
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});

router.get('/calculadora/:idcalculadora/estudiante/:idestudiante', async (req, res) => {
    try{
        const historial = await HistorialCalculadora.findAll({
            where: {
                idcalculadora: req.params.idcalculadora,
                idestudiante: req.params.idestudiante
            }
        });
        res.json(historial);
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});


// POST a new historial entry
router.post('/', async (req, res) => {
    try {
        const historial = await HistorialCalculadora.create(req.body);
        res.status(201).json(historial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a specific historial entry by ID
router.put('/:id', async (req, res) => {
    // Update your model fields here
    try {
        const historial = await HistorialCalculadora.findByPk(req.params.id);
        if (historial) {
            await historial.update(req.body);
            res.json({ message: 'Historial entry updated' });
        } else {
            res.status(404).json({ message: 'Historial entry not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a specific historial entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const historial = await HistorialCalculadora.findByPk(req.params.id);
        if (historial) {
            await historial.destroy();
            res.json({ message: 'Historial entry deleted' });
        } else {
            res.status(404).json({ message: 'Historial entry not found' });
        }
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;