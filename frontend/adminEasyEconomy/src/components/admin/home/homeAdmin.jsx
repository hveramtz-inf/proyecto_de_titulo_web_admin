import React, { useState, useEffect} from 'react';
import NavBarAdmin from './NavbarAdmin';
import VerClaverPucv from '../clavePucv/verClavesPucv';
import VerDocentes from '../docentes/verDocentes';
import VerEstudiantes from '../estudiantes/verEstudiantes';
import { useLocation } from 'react-router-dom';

function HomeAdmin() {
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
    <div>
      <NavBarAdmin onSelect={handleNavBarSelection} />
      <div className="content">
        {selectedOption === 'ClavePucv' && <VerClaverPucv />}
        {selectedOption === 'Docentes' && < VerDocentes/>}
        {selectedOption === 'Estudiantes' && < VerEstudiantes/>}
      </div>
    </div>
  );
}

export default HomeAdmin;