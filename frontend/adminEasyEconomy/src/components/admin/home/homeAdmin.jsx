import React, { useState } from 'react';
import NavBarAdmin from './NavbarAdmin';
import ClavePucv from './ClavePucv';
import Docentes from './Docentes';
import Estudiantes from './Estudiantes';

function HomeAdmin() {
  const [selectedOption, setSelectedOption] = useState('ClavePucv');

  const handleNavBarSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavBarAdmin onSelect={handleNavBarSelection} />
      <div className="content">
        {selectedOption === 'ClavePucv' && <ClavePucv />}
        {selectedOption === 'Docentes' && <Docentes />}
        {selectedOption === 'Estudiantes' && <Estudiantes />}
      </div>
    </div>
  );
}

export default HomeAdmin;