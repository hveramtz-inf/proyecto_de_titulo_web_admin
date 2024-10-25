// frontend/adminEasyEconomy/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClaveCursoProvider } from './context/ClaveCursoContext';
import AppRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS

const App = () => {
  return (
    <ClaveCursoProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ClaveCursoProvider>
  );
};

export default App;