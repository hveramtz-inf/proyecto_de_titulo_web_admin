const admin = require('firebase-admin');
const serviceAccount = require('./easyeconomy-d48d6-firebase-adminsdk-8jidh-1a4c16fc57.json'); // Asegúrate de ajustar la ruta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://easyeconomy-d48d6.firebaseio.com' // Asegúrate de usar la URL correcta de tu base de datos
});

const db = admin.firestore();

module.exports = { db };