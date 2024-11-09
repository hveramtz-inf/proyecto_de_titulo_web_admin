const Express = require('express');
const Cors = require('cors'); // Importa el paquete cors
const db = require('./database/db.js'); // Importa la configuración de Sequelizes
const app = Express();
const port = 3000;

// Configura el middleware cors
app.use(Cors());

app.use(Express.json({ limit: '50mb' }));
app.use(Express.urlencoded({ limit: '50mb', extended: true }));

// Aumentar el tiempo de espera de la solicitud
app.use((req, res, next) => {
  res.setTimeout(300000, () => { // 300 segundos
    console.log('Request has timed out.');
    res.sendStatus(408);
  });
  next();
});

// Importar las rutas web 
const cursosRoutes = require('./routes/web/rutaCursos.js');

const clavepucvRoutes = require('./routes/web/rutaClavePucv.js');
const seccionesRoutes = require('./routes/web/rutaSecciones.js');
const cuestionarioRoutes = require('./routes/web/rutaCuestionarios.js');
const preguntasRoutes = require('./routes/web/rutaPreguntas.js');
const respuestasRoutes = require('./routes/web/rutaRespuestas.js');
const calculadoraRoutes = require('./routes/web/rutaCalculadora.js');
const docenteRoutes = require('./routes/web/rutaDocente.js');
const verifyTokenRoute = require('./routes/verifyTokenRoute.js');

//Importar las rutas móviles
const apuntesMobileRoutes = require('./routes/mobile/rutaApuntes.js');
const estudiantesMobileRoutes = require('./routes/mobile/rutaEstudiante.js');
const favoritosCalculadoraMobileRoutes = require('./routes/mobile/rutaFavoritoCalculadora.js');
const favoritosCuestionarioMobileRoutes = require('./routes/mobile/rutaFavoritoCuestionario.js');
const historialMobileRoutes = require('./routes/mobile/rutaHistorial.js');
const calculadoraMobileRoutes = require('./routes/mobile/rutaMoCalculadora.js');
const cuestionarioMobileRoutes = require('./routes/mobile/rutaMoCuestionario.js');
const cursosMobileRoutes = require('./routes/mobile/rutaMoCursos.js');
const preguntasMobileRoutes = require('./routes/mobile/rutaMoPreguntas.js');
const respuestasMobileRoutes = require('./routes/mobile/rutaMoRespuestas.js');
const seccionesMobileRoutes = require('./routes/mobile/rutaMoSecciones.js');
const progresoCursoMobileRoutes = require('./routes/mobile/rutaProgresoCurso.js');
const puntajeCuestionarioMobileRoutes = require('./routes/mobile/rutaPuntajeCuestionario.js');
const secccionRevisadaMobileRoutes = require('./routes/mobile/rutaSeccionRevisada.js');
const variablesHistorialMobileRoutes = require('./routes/mobile/rutaVariableHistorial.js');


// rutas para la aplicación web
app.use('/cursos', cursosRoutes);
app.use('/docente', docenteRoutes); // Puedes proteger algunas rutas de docente si es necesario
app.use('/clavepucv', clavepucvRoutes);
app.use('/secciones', seccionesRoutes);
app.use('/cuestionarios', cuestionarioRoutes);
app.use('/preguntas', preguntasRoutes);
app.use('/respuestas', respuestasRoutes);
app.use('/calculadoras', calculadoraRoutes);
app.use('/verify-token', verifyTokenRoute);

// Rutas para la aplicación móvil
app.use('/movil/apuntes', apuntesMobileRoutes);
app.use('/movil/estudiantes', estudiantesMobileRoutes);
app.use('/movil/favoritosCalculadora', favoritosCalculadoraMobileRoutes);
app.use('/movil/favoritosCuestionario', favoritosCuestionarioMobileRoutes);
app.use('/movil/historialCalculadora', historialMobileRoutes);
app.use('/movil/calculadoras', calculadoraMobileRoutes);
app.use('/movil/cuestionarios', cuestionarioMobileRoutes);
app.use('/movil/cursos', cursosMobileRoutes);
app.use('/movil/preguntas', preguntasMobileRoutes);
app.use('/movil/respuestas', respuestasMobileRoutes);
app.use('/movil/secciones', seccionesMobileRoutes);
app.use('/movil/progresoCurso', progresoCursoMobileRoutes);
app.use('/movil/puntajeCuestionario', puntajeCuestionarioMobileRoutes);
app.use('/movil/seccionRevisada', secccionRevisadaMobileRoutes);
app.use('/movil/variableHistorial', variablesHistorialMobileRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});