import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClaveCursoProvider } from './context/ClaveCursoContext';
import { DocenteProvider } from './context/DocenteContext';
import AppRoutes from './routes/routes';
import TokenVerifier from './components/TokenVerifier';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './global.css'; // Importa el archivo CSS global

const App = () => {
  return (
    <DocenteProvider>
      <ClaveCursoProvider>
        <Router>
          <TokenVerifier>
            <AppRoutes />
          </TokenVerifier>
        </Router>
      </ClaveCursoProvider>
    </DocenteProvider>
  );
};

export default App;