import React, { createContext, useState, useEffect } from 'react';

export const DocenteContext = createContext();

export const DocenteProvider = ({ children }) => {
  const [docente, setDocente] = useState(() => {
    const savedDocente = localStorage.getItem('docente');
    if (savedDocente && savedDocente !== 'undefined') {
      try {
        return JSON.parse(savedDocente);
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (docente !== null) {
      localStorage.setItem('docente', JSON.stringify(docente));
    } else {
      localStorage.removeItem('docente');
    }
  }, [docente]);

  return (
    <DocenteContext.Provider value={{ docente, setDocente }}>
      {children}
    </DocenteContext.Provider>
  );
};