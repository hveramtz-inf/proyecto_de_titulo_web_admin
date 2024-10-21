const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Verificar los valores de las variables de entorno
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);

// Configuración de Sequelize usando las variables de entorno
const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  port: process.env.PGPORT || 5432, // Puerto por defecto para PostgreSQL
  logging: false, // Desactiva el registro de consultas SQL en la consola
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Puedes ajustar esto según tus necesidades de seguridad
    }
  }
});

// Probar la conexión
db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = db;