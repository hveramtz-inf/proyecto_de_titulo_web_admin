const express = require('express');
const VariableHistorial = require('../models/VariableHistorialModel');

const router = express.Router();

// Get all VariableHistorial records
router.get('/', async (req, res) => {
    try {
        const records = await VariableHistorial.findAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
});

// Get a single VariableHistorial record by ID
router.get('/:id', async (req, res) => {
    try {
        const record = await VariableHistorial.findByPk(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch record' });
    }
});


router.get('/historial/:idhistorial', async (req, res) => {
    try {
        const records = await VariableHistorial.findAll({
            where: {
                idhistorial: req.params.idhistorial
            }
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
});

// Create a new VariableHistorial record
router.post('/', async (req, res) => {
    try {
        const newRecord = await VariableHistorial.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create record' });
    }
});

// Update an existing VariableHistorial record by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await VariableHistorial.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRecord = await VariableHistorial.findByPk(req.params.id);
            res.json(updatedRecord);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update record' });
    }
});

// Delete a VariableHistorial record by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await VariableHistorial.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete record' });
    }
});

module.exports = router;