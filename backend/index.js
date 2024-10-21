const Express = require('express');
const Cors = require('cors'); // Importa el paquete cors
const db = require('./database/db.js'); // Importa la configuración de Sequelize
const app = Express();
const port = 3000;

// Configura el middleware cors
app.use(Cors());

app.use(Express.json());

// Importar las rutas
const cursosRoutes = require('./routes/rutaCursos.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo courses.js
const estudiantesRoutes = require('./routes/rutaEstudiante.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo usuarios.js
const clavepucvRoutes = require('./routes/rutaClavePucv.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo clavePucv.js
const seccionesRoutes = require('./routes/rutaSecciones.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo secciones.js}
const cuestionarioRoutes = require('./routes/rutaCuestionarios.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo cuestionarios.js
const preguntasRoutes = require('./routes/rutaPreguntas.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo preguntas.js
const respuestasRoutes = require('./routes/rutaRespuestas.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo respuestas.js

// Usar las rutas
app.use('/cursos', cursosRoutes);
app.use('/estudiantes', estudiantesRoutes);
app.use('/clavepucv', clavepucvRoutes);
app.use('/secciones', seccionesRoutes);
app.use('/cuestionarios', cuestionarioRoutes);
app.use('/preguntas', preguntasRoutes);
app.use('/respuestas', respuestasRoutes);

// Sincronizar modelos con la base de datos
db.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos con la base de datos', err);
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});