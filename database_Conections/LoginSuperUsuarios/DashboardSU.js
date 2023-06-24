const connection = require('../../SQL_CONECTION');

function getTable(req, res) {
    connection.query('SELECT * FROM superusuarios', (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error en el servidor');
      } else {
        res.json(results);
      }
    });
  }
  

module.exports = {
    getTable
};
