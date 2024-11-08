const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secretKey = 'your_secret_key'; // Asegúrate de usar la misma clave secreta que usaste para firmar los tokens

router.get('/', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ valid: false });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false });
    }
    res.json({ valid: true });
  });
});

module.exports = router;