const Express = require('express');
const Cors = require('cors'); // Importa el paquete cors
const db = require('./database/db.js'); // Importa la configuración de Sequelize
const verifyToken = require('./middlewares/authMiddleware..js'); // Importa el middleware de autenticación
const app = Express();
const port = 3000;

// Configura el middleware cors
app.use(Cors());

app.use(Express.json());

// Importar las rutas
const cursosRoutes = require('./routes/rutaCursos.js');
const estudiantesRoutes = require('./routes/rutaEstudiante.js');
const clavepucvRoutes = require('./routes/rutaClavePucv.js');
const seccionesRoutes = require('./routes/rutaSecciones.js');
const cuestionarioRoutes = require('./routes/rutaCuestionarios.js');
const preguntasRoutes = require('./routes/rutaPreguntas.js');
const respuestasRoutes = require('./routes/rutaRespuestas.js');
const apuntesRoutes = require('./routes/rutaApuntes.js');
const puntajeCuestionarioRoutes = require('./routes/rutaPuntajeCuestionario.js');
const calculadoraRoutes = require('./routes/rutaCalculadora.js');
const historialRoutes = require('./routes/rutaHistorial.js');
const variableHistorial = require('./routes/rutaVariableHistorial.js');
const favoritosCalculadoraRoutes = require('./routes/rutaFavoritoCalculadora.js');
const favoritosCuestionarioRoutes = require('./routes/rutaFavoritoCuestionario.js');
const progresoCursoRoutes = require('./routes/rutaProgresoCurso.js');
const seccionRevisadaRoutes = require('./routes/rutaSeccionRevisada.js');
const docenteRoutes = require('./routes/rutaDocente.js');
const verifyTokenRoute = require('./routes/verifyTokenRoute.js');

// Usar las rutas
app.use('/cursos', verifyToken, cursosRoutes);
app.use('/clavepucv', verifyToken, clavepucvRoutes);
app.use('/secciones', verifyToken, seccionesRoutes);
app.use('/cuestionarios', verifyToken, cuestionarioRoutes);
app.use('/preguntas', verifyToken, preguntasRoutes);
app.use('/respuestas', verifyToken, respuestasRoutes);
app.use('/apuntes', verifyToken, apuntesRoutes);
app.use('/puntajeCuestionario', verifyToken, puntajeCuestionarioRoutes);
app.use('/calculadoras', verifyToken, calculadoraRoutes);
app.use('/historialCalculadora', verifyToken, historialRoutes);
app.use('/variableHistorial', verifyToken, variableHistorial);
app.use('/favoritosCalculadora', verifyToken, favoritosCalculadoraRoutes);
app.use('/favoritosCuestionario', verifyToken, favoritosCuestionarioRoutes);
app.use('/progresoCurso', verifyToken, progresoCursoRoutes);
app.use('/seccionRevisada', verifyToken, seccionRevisadaRoutes);
app.use('/docente', docenteRoutes); // Puedes proteger algunas rutas de docente si es necesario
app.use('/verify-token',verifyTokenRoute);


//rutas celular
app.use('/movil/estudiantes', estudiantesRoutes);
app.use('/movil/cursos', cursosRoutes);
app.use('/movil/clavepucv', clavepucvRoutes);
app.use('/movil/secciones', seccionesRoutes);
app.use('/movil/cuestionarios', cuestionarioRoutes);
app.use('/movil/preguntas', preguntasRoutes);
app.use('/movil/respuestas', respuestasRoutes);
app.use('/movil/apuntes', apuntesRoutes);
app.use('/movil/puntajeCuestionario', puntajeCuestionarioRoutes);
app.use('/movil/calculadoras', calculadoraRoutes);
app.use('/movil/historialCalculadora', historialRoutes);
app.use('/movil/variableHistorial', variableHistorial);
app.use('/movil/favoritosCalculadora', favoritosCalculadoraRoutes);
app.use('/movil/favoritosCuestionario', favoritosCuestionarioRoutes);
app.use('/movil/progresoCurso', progresoCursoRoutes);
app.use('/movil/seccionRevisada', seccionRevisadaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});