import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClaveCurso from '../components/claveCurso/claveCurso.jsx';
import Home from '../components/Home/home.jsx';
import Cursos from '../components/cursos/cursos.jsx';
import Cuestionarios from '../components/cuestionarios/cuestionarios.jsx';
import AgregarCurso from '../components/cursos/agregarCurso.jsx';
import Editarcurso from '../components/cursos/editarCurso.jsx';
import VerSeccionesCurso from '../components/seccionesCurso/verSeccionesCurso.jsx';
import AgregarSeccionCurso from '../components/seccionesCurso/agregarSeccionCurso.jsx';
import EditarSeccionCurso from '../components/seccionesCurso/editarSeccionCurso.jsx';
import AgregarCuestionario from '../components/cuestionarios/agregarCuestionario.jsx';
import EditarCuestionario from '../components/cuestionarios/editarCuestionario.jsx';
import Calculadoras from '../components/calculadoras/calculadoras.jsx';
import AgregarCalculadora from '../components/calculadoras/agregarCalculadora.jsx';
import EditarCalculadora from '../components/calculadoras/editarCalculadora.jsx';
import InicioSesionDocente from '../components/inicioSecionDocente/inicioSesionDocente.jsx';
import InicioSesionAdmin from '../components/admin/inicioSesionAdmin/inicioSesionAdmin.jsx'
// administrador
import HomeAdmin from '../components/admin/home/homeAdmin.jsx'
import EditarDocente from '../components/admin/docentes/editarDocente.jsx'
import EditarEstudiante from '../components/admin/estudiantes/editarEstudiante.jsx'
import EditarClavePucv from '../components/admin/clavePucv/editarClavePucv.jsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<InicioSesionDocente />} />
    <Route path="/claveCurso" element={<ClaveCurso />} />
    <Route path="/home" element={<Home />} />
    <Route path="*" element={<h1>Not Found</h1>} />
    <Route path="/cursos" element={<Cursos />} />
    <Route path="/cursos/agregar" element={<AgregarCurso />} />
    <Route path="/cursos/editar/:cursoId" element={<Editarcurso />} />
    <Route path="/secciones/:cursoId" element={<VerSeccionesCurso />} />
    <Route path="/secciones/agregar/:cursoId" element={<AgregarSeccionCurso />} />
    <Route path="/secciones/editar/:cursoId/:seccionId" element={<EditarSeccionCurso />} />
    <Route path="/cuestionarios" element={<Cuestionarios />} />
    <Route path="/cuestionarios/agregar/:cursoId" element={<AgregarCuestionario />} />
    <Route path="/cuestionarios/editar/:cuestionarioId" element={<EditarCuestionario />} />
    <Route path="/calculadoras" element={<Calculadoras />} />
    <Route path="/calculadoras/crear" element={<AgregarCalculadora />} />
    <Route path="/calculadoras/editar/:id" element={<EditarCalculadora />} />

    /* rutas admin */
    <Route path="/inicioSesionAdmin" element={<InicioSesionAdmin />} />
    <Route path="/homeAdmin" element={<HomeAdmin />} />
    <Route path="/editarDocente/:id" element={<EditarDocente />} />
    <Route path="/editarEstudiante/:id" element={<EditarEstudiante />} />
    <Route path="/editarClavePucv/:id" element={<EditarClavePucv />} />

  </Routes>
);

export default AppRoutes;