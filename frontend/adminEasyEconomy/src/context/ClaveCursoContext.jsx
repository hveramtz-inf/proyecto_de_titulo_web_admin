// frontend/adminEasyEconomy/src/context/ClaveCursoContext.js
import React, { createContext, useState } from 'react';

export const ClaveCursoContext = createContext();

export const ClaveCursoProvider = ({ children }) => {
  const [claveCurso, setClaveCurso] = useState('');

  return (
    <ClaveCursoContext.Provider value={{ claveCurso, setClaveCurso }}>
      {children}
    </ClaveCursoContext.Provider>
  );
};