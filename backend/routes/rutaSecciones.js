const express = require('express');
const { db } = require('../database/firebaseConfig'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo firebaseConfig.js
const router = express.Router();

// Obtener todas las secciones de un curso
router.get('/:cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;
        const seccionesSnapshot = await db.collection('Curso').doc(cursoId).collection('seccion').get();
        const secciones = seccionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(secciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva sección en un curso
router.post(':cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;
        const { contenido, descripcion, titulo } = req.body;
        const nuevaSeccion = { contenido, descripcion, titulo };
        const seccionRef = await db.collection('Curso').doc(cursoId).collection('seccion').add(nuevaSeccion);
        res.status(201).json({ id: seccionRef.id, ...nuevaSeccion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una sección existente en un curso
router.put('/:cursoId/:id', async (req, res) => {
    try {
        const { cursoId, id } = req.params;
        const { contenido, descripcion, titulo } = req.body;
        const seccionActualizada = { contenido, descripcion, titulo };
        await db.collection('Curso').doc(cursoId).collection('seccion').doc(id).update(seccionActualizada);
        res.status(200).json({ id, ...seccionActualizada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una sección de un curso
router.delete('/:cursoId/:id', async (req, res) => {
    try {
        const { cursoId, id } = req.params;
        await db.collection('Curso').doc(cursoId).collection('seccion').doc(id).delete();
        res.status(200).json({ message: 'Sección eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;