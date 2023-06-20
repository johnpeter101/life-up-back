const express = require('express');
const app = express();
const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'SuperUsuario',
  password: 'Javier117',
  database: 'life-up-db'
});

// Conexión a la base de datos MySQL
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/datos', (req, res) => {
  connection.query('SELECT * FROM superusuarios', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
