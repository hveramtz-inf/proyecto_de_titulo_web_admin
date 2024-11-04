import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Cursos from '../cursos/cursos';
import Cuestionarios from '../cuestionarios/cuestionarios';
import Calculadoras from '../calculadoras/calculadoras';
import BienvenidaHome from './bienvenidaHome';
import './home.css'; // Asegúrate de importar el archivo CSS

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  

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
      <NavBar onSelect={handleNavBarSelection} className="navbar-fixed" />
      <div className="content">
        {selectedOption === 'home' && <BienvenidaHome />}
        {selectedOption === 'Cursos' && <Cursos />}
        {selectedOption === 'Cuestionarios' && <Cuestionarios />}
        {selectedOption === 'Calculadoras' && <Calculadoras />}
      </div>
    </div>
  );
};

export default Home;