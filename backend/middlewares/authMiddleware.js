const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Asegúrate de usar la misma clave secreta que usaste para firmar los tokens

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    // Si el token es válido, guarda el id del usuario en la solicitud para su uso posterior
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;