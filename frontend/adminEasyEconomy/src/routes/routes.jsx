// frontend/adminEasyEconomy/src/routes/routes.jsx
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ClaveCurso />} />
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
    <Route path="/calculadoras/crear" element={<AgregarCalculadora/>} />
  </Routes>
);

export default AppRoutes;