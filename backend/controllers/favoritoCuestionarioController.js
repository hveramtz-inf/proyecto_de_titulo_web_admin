const FavoritosCuestionario = require('../models/FavoritosCuestionarioModel.js');

// Obtener todos los favoritos de cuestionarios
exports.getAllFavoritosCuestionario = async (req, res) => {
  try {
    const favoritos = await FavoritosCuestionario.findAll();
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos de cuestionarios' });
  }
};

// Obtener favoritos de cuestionarios por ID de estudiante
exports.getFavoritosCuestionarioByEstudianteId = async (req, res) => {
  try {
    const favoritos = await FavoritosCuestionario.findAll({ where: { idestudiante: req.params.id } });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos de cuestionarios' });
  }
};

// Obtener un favorito de cuestionario por ID
exports.getFavoritoCuestionarioById = async (req, res) => {
  try {
    const favorito = await FavoritosCuestionario.findByPk(req.params.id);
    if (favorito) {
      res.json(favorito);
    } else {
      res.status(404).json({ error: 'Favorito de cuestionario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el favorito de cuestionario' });
  }
};

// Crear un nuevo favorito de cuestionario
exports.createFavoritoCuestionario = async (req, res) => {
  try {
    const nuevoFavorito = await FavoritosCuestionario.create(req.body);
    res.status(201).json(nuevoFavorito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el favorito de cuestionario' });
  }
};

// Actualizar un favorito de cuestionario por ID
exports.updateFavoritoCuestionario = async (req, res) => {
  try {
    const favorito = await FavoritosCuestionario.findByPk(req.params.id);
    if (favorito) {
      await favorito.update(req.body);
      res.json(favorito);
    } else {
      res.status(404).json({ error: 'Favorito de cuestionario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el favorito de cuestionario' });
  }
};

// Eliminar un favorito de cuestionario por ID
exports.deleteFavoritoCuestionario = async (req, res) => {
  try {
    const favorito = await FavoritosCuestionario.findByPk(req.params.id);
    if (favorito) {
      await favorito.destroy();
      res.json({ message: 'Favorito de cuestionario eliminado' });
    } else {
      res.status(404).json({ error: 'Favorito de cuestionario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito de cuestionario' });
  }
};