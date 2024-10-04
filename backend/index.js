const Express = require('express');
const Cors = require('cors'); // Importa el paquete cors
const app = Express();
const port = 3000;

// Configura el middleware cors
app.use(Cors());

app.use(Express.json());

// Importar las rutas
const coursesRoutes = require('./routes/rutaCursos'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo courses.js

// Usar las rutas
app.use('/cursos', coursesRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});