
const connection = require('../../SQL_CONECTION');

//-----------------------------------------------------------obtener el id del personal que esta agregando 
function GetCentroID(req, res, ID_personal) {
    const { ID_PERSONAL } = req.body;
    connection.query('SELECT * FROM personal WHERE PersonalID = ?', [ID_personal], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            const { email, password } = req.body;
            if (results && results.length > 0) {
                const id = results[0].ID_Centro;
                //console.log("centro: "+ id);
                    res.json({ Centro: id});
               
            } else {
                res.sendStatus(401); // No autorizado
            }
        }
    });
}

//---------------------------------------------------------------------INSERT- USER
function InsertNewUserInfoPersonal(req, res, formData) {

    connection.query('INSERT INTO usuarios SET ?', formData, (error, results) => {

      if (error) {
        console.error('Error al realizar el INSERT:', error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
      } else {
        //console.log('Usuario agregado exitosamente');
        res.status(200).json({ message: 'Usuario agregado exitosamente' });
      }
    });
  }

module.exports = {
    GetCentroID, 
    InsertNewUserInfoPersonal
};
