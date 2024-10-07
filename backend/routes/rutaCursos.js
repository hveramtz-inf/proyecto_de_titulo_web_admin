const express = require('express');
const { db } = require('../database/firebaseConfig'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo firebaseConfig.js
const router = express.Router();

// Ruta para obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const cursosSnapshot = await db.collection('Curso').get();
    const cursosList = await Promise.all(cursosSnapshot.docs.map(async doc => {
      const cursoData = doc.data();
      const subcollections = await doc.ref.listCollections();
      const subcollectionsData = {};
      for (const subcollection of subcollections) {
        const subcollectionSnapshot = await subcollection.get();
        subcollectionsData[subcollection.id] = subcollectionSnapshot.docs.map(subDoc => ({ id: subDoc.id, ...subDoc.data() }));
      }
      return { id: doc.id, ...cursoData, subcollections: subcollectionsData };
    }));
    res.status(200).json(cursosList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const cursoId = req.params.id;
    const cursoDoc = await db.collection('Curso').doc(cursoId).get();
    if (!cursoDoc.exists) {
      res.status(404).json({ error: 'Curso no encontrado' });
    } else {
      res.status(200).json({ id: cursoDoc.id, ...cursoDoc.data() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const { Titulo, Descripcion } = req.body;
    if (!Titulo || !Descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const nuevoCurso = { Titulo, Descripcion };
    const cursoRef = await db.collection('Curso').add(nuevoCurso);
    res.status(201).json({ id: cursoRef.id, ...nuevoCurso });
  } catch (error) {
    console.error('Error al crear el curso:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un curso por ID
router.put('/:id', async (req, res) => {
  try {
    const cursoId = req.params.id;
    const { Titulo, Descripcion } = req.body; // Asegúrate de usar los nombres de los campos correctos
    const cursoActualizado = { Titulo, Descripcion }; // Aquí usa los campos correctos
    await db.collection('Curso').doc(cursoId).set(cursoActualizado, { merge: true });
    res.status(200).json({ id: cursoId, ...cursoActualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un curso por ID
router.delete('/:id', async (req, res) => {
  try {
    const cursoId = req.params.id;
    await db.collection('Curso').doc(cursoId).delete();
    res.status(200).json({ message: 'Curso eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;