const FavoritosCalculadora = require('../models/FavoritosCalculadoraModel.js');

// Obtener todos los favoritos de calculadoras
exports.getAllFavoritosCalculadora = async (req, res) => {
  try {
    const favoritos = await FavoritosCalculadora.findAll();
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos de calculadoras' });
  }
};

// Obtener favoritos de calculadoras por ID de estudiante
exports.getFavoritosCalculadoraByEstudianteId = async (req, res) => {
  try {
    const favoritos = await FavoritosCalculadora.findAll({ where: { idestudiante: req.params.id } });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos de calculadoras' });
  }
};

// Obtener un favorito de calculadora por ID
exports.getFavoritoCalculadoraById = async (req, res) => {
  try {
    const favorito = await FavoritosCalculadora.findByPk(req.params.id);
    if (favorito) {
      res.json(favorito);
    } else {
      res.status(404).json({ error: 'Favorito de calculadora no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el favorito de calculadora' });
  }
};

// Crear un nuevo favorito de calculadora
exports.createFavoritoCalculadora = async (req, res) => {
  try {
    const nuevoFavorito = await FavoritosCalculadora.create(req.body);
    res.status(201).json(nuevoFavorito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el favorito de calculadora' });
  }
};

// Actualizar un favorito de calculadora por ID
exports.updateFavoritoCalculadora = async (req, res) => {
  try {
    const favorito = await FavoritosCalculadora.findByPk(req.params.id);
    if (favorito) {
      await favorito.update(req.body);
      res.json(favorito);
    } else {
      res.status(404).json({ error: 'Favorito de calculadora no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el favorito de calculadora' });
  }
};

// Eliminar un favorito de calculadora por ID
exports.deleteFavoritoCalculadora = async (req, res) => {
  try {
    const favorito = await FavoritosCalculadora.findByPk(req.params.id);
    if (favorito) {
      await favorito.destroy();
      res.json({ message: 'Favorito de calculadora eliminado' });
    } else {
      res.status(404).json({ error: 'Favorito de calculadora no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito de calculadora' });
  }
};