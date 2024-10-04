import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClaveCurso from '../components/claveCurso/claveCurso.jsx'
import Home from '../components/Home/home.jsx'
import Cursos from '../components/cursos/cursos.jsx'
import Cuestionarios from '../components/cuestionarios/cuestionarios.jsx'
import AgregarCurso from '../components/cursos/agregarCurso.jsx'
import Editarcurso from '../components/cursos/editarcurso.jsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ClaveCurso />} />
    <Route path="/home" element={<Home />} />
    <Route path="*" element={<h1>Not Found</h1>} />
    <Route path="/cursos" element={<Cursos />} />
    <Route path="/cursos/agregar" element={<AgregarCurso />} />
    <Route path="/cursos/editar/:cursoId" element={<Editarcurso />} />
    <Route path="/cuestionarios" element={<Cuestionarios />} />
  </Routes>
)

export default AppRoutes