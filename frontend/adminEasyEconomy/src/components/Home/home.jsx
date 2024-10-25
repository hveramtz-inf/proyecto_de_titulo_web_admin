// frontend/adminEasyEconomy/src/components/Home/Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Cursos from '../cursos/cursos';
import Cuestionarios from '../cuestionarios/cuestionarios';
import { ClaveCursoContext } from '../../context/ClaveCursoContext';
import './home.css'; // Asegúrate de importar el archivo CSS

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const claveCurso = queryParams.get('claveCurso');
  const { setClaveCurso } = useContext(ClaveCursoContext);

  useEffect(() => {
    if (claveCurso) {
      setClaveCurso(claveCurso);
    }
  }, [claveCurso, setClaveCurso]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setSelectedOption(hash);
    }
  }, [location]);

  const handleNavBarSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="home-container">
      <NavBar onSelect={handleNavBarSelection} claveCurso={claveCurso} />
      {selectedOption === 'Cursos' && <Cursos />}
      {selectedOption === 'Cuestionarios' && <Cuestionarios />}
    </div>
  );
};

export default Home;