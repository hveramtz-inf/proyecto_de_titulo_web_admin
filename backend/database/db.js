const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Verificar los valores de las variables de entorno
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGUSER:', process.env.PGUSER);

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
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
  }
};

testConnection();

module.exports = db;