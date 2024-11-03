import React, { createContext, useState } from 'react';

export const DocenteContext = createContext();

export const DocenteProvider = ({ children }) => {
  const [docente, setDocente] = useState(null);

  return (
    <DocenteContext.Provider value={{ docente, setDocente }}>
      {children}
    </DocenteContext.Provider>
  );
};