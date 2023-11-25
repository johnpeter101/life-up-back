const connection = require('../../SQL_CONECTION');

function InsertNewExpedienteSalud(req, res, formData) {
    connection.query('INSERT INTO salud_expedientes SET ?', formData, (error, results) => {
  
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

  function InsertNewConsultaSalud(req, res, formData) {
    connection.query('INSERT INTO salud_consultas SET ?', formData, (error, results) => {
      console.log("entro");
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
function GetAllExpedientes(req, res) {
    // Realizar la consulta SQL para obtener todas las consultas
    connection.query('SELECT * FROM salud_expedientes', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las consultas' });
        } else {
            // Enviar los resultados de la consulta como respuesta
            res.status(200).json(results);
        }
    });
}
function GetAllConsultas(req, res) {
    // Realizar la consulta SQL para obtener todas las consultas
    connection.query('SELECT * FROM salud_consultas', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener las consultas' });
        } else {
            // Enviar los resultados de la consulta como respuesta
            res.status(200).json(results);
        }
    });
}
function CheckExpedienteExistente(req, res, ID) {
    connection.query('SELECT * FROM salud_expedientes WHERE UserID = ?', [ID], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).json({ error: 'Error al ejecutar la consulta' });
        }

        if (results && results.length > 0) {
            // Expediente encontrado
            return res.status(200).json({ existe: true });
        } else {
            // No se encontró expediente
            console.log('No encontrado');
            return res.status(200).json({ existe: false });
        }
    });
}



  module.exports = {
    InsertNewExpedienteSalud,
    InsertNewConsultaSalud,
    GetAllExpedientes,
    GetAllConsultas,
    CheckExpedienteExistente
  }