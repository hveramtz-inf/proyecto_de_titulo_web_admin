import React, { createContext, useState, useEffect } from 'react';

export const ClaveCursoContext = createContext();

export const ClaveCursoProvider = ({ children }) => {
  const [claveCurso, setClaveCurso] = useState(() => {
    const savedClaveCurso = localStorage.getItem('claveCurso');
    return savedClaveCurso ? JSON.parse(savedClaveCurso) : '';
  });

  useEffect(() => {
    if (claveCurso !== '') {
      localStorage.setItem('claveCurso', JSON.stringify(claveCurso));
    } else {
      localStorage.removeItem('claveCurso');
    }
  }, [claveCurso]);

  return (
    <ClaveCursoContext.Provider value={{ claveCurso, setClaveCurso }}>
      {children}
    </ClaveCursoContext.Provider>
  );
};