import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TokenVerifier = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to /');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('https://easy-economy.fly.dev/verify-token', {
          headers: {
            'Authorization': token,
          },
        });

        if (!response.data.valid) {
          console.log('Token invalid, redirecting to /');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          console.log('Token valid');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    if (location.pathname !== '/') {
      const interval = setInterval(checkTokenValidity, 60000); // Verificar cada 60 segundos

      // Verificar inmediatamente al cargar la aplicación
      checkTokenValidity();

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

export default TokenVerifier;