const connection = require('../../SQL_CONECTION');

function InsertNewConsultPsicologia(req, res, formData) {
    connection.query('INSERT INTO psicologia SET ?', formData, (error, results) => {
  
      if (error) {
        console.error('Error al realizar el INSERT:', error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
      } else {
        //console.log('Usuario agregado exitosamente');
        res.status(200).json({ message: ' agregado exitosamente' });
        //agregar el usuario
      }
    });
  }
    function GetAllConsultasPsicologia(req, res) {
        // Realizar la consulta SQL para obtener todas las consultas
        connection.query('SELECT * FROM psicologia', (error, results) => {
            if (error) {
                console.error('Error al realizar la consulta:', error);
                res.status(500).json({ error: 'Ocurrió un error al obtener las consultas' });
            } else {
                // Enviar los resultados de la consulta como respuesta
                res.status(200).json(results);
            }
        });
    }


module.exports = {
    InsertNewConsultPsicologia,
    GetAllConsultasPsicologia
};
