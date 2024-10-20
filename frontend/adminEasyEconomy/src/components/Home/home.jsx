import React, { useState } from 'react';
import NavBar from '../Navbar/NavBar';
import { useLocation } from 'react-router-dom';
import Cursos from '../cursos/cursos'; // Asegúrate de importar el componente Cursos
import Cuestionarios from '../cuestionarios/cuestionarios';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const claveCurso = queryParams.get('claveCurso');

  const handleNavBarSelection = (option, claveCurso) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavBar onSelect={handleNavBarSelection} claveCurso={claveCurso} />
      {selectedOption === 'Cursos' && <Cursos claveCurso={claveCurso} />}
      {selectedOption === 'Cuestionarios' && <Cuestionarios claveCurso={claveCurso} />}
    </div>
  );
};

export default Home;