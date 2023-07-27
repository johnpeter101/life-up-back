
const connection = require('../../SQL_CONECTION');
const multer = require('multer'); // Middleware para manejar archivos en formularios

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
        res.json({ Centro: id });

      } else {
        res.sendStatus(401); // No autorizado
      }
    }
  });
}

//---------------------------------------------------------------------INSERT- USER personal
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


//---------------------------------------------------------------------INSERT- USER contact
function InsertNewUserInfoContact(req, res, formData) {

  connection.query('INSERT INTO direcciones SET ?', formData, (error, results) => {

    if (error) {
      console.error('Error al realizar el INSERT:', error);
      res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
    } else {
      //console.log('Usuario agregado exitosamente');
      res.status(200).json({ message: 'Usuario agregado exitosamente' });
    }
  });
}

function InsertNewUserInfoEmergencia(req, res, formData) {

  connection.query('INSERT INTO contactoemergencia SET ?', formData, (error, results) => {

    if (error) {
      console.error('Error al realizar el INSERT:', error);
      res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
    } else {
      //console.log('Usuario agregado exitosamente');
      res.status(200).json({ message: 'Usuario agregado exitosamente' });
      //agregar el usuario
    }
  });
}


function InsertNewUserPhoto(req, res, formData) {
  connection.query('INSERT INTO fotouser SET ?', formData, (error, results) => {

    if (error) {
      console.error('Error al realizar el INSERT:', error);
      res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
    } else {
      //console.log('Usuario agregado exitosamente');
      res.status(200).json({ message: 'foto agregado exitosamente' });
      //agregar el usuario
    }
  });
}


function obtenerResumenUserNew(req, res) {
  //declaracion de variables
  let ID = "";
  let Nombre = "";
  let AP = "";
  let AM = "";
  let Edad = "";
  let Telefono = "";

  let Calle = "";
  let Colonia = "";
  let CP = "";
  let Delegacion = "";
  let Ciudad = "";
  let Estado = "";

  let Parentesco = "";
  let NombreEmer = "";
  let ApEmer = "";
  let AmEmer = "";
  let EdadEmer = "";
  let TelefonoEmer = "";
  let URL = "";
  const { UserID } = req.body;
  console.log(UserID);

  connection.query('SELECT * FROM usuarios WHERE UserID = ?', [UserID], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error en el servidor');
    } else {
      const { email, password } = req.body;
      if (results && results.length > 0) {

        ID = results[0].UserID;
        Nombre = results[0].Nombre;
        AP = results[0].ApellidoPaterno;
        AM = results[0].ApellidoMaterno;
        Edad = results[0].Edad;
        Telefono = results[0].Telefono;
        //console.log("centro: "+ id);
        //obtener los siguientes values
        connection.query('SELECT * FROM direcciones WHERE UserID = ?', [UserID], (error, results) => {
          if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
          } else {
            const { email, password } = req.body;
            if (results && results.length > 0) {


              Calle = results[0].Calle;
              Colonia = results[0].Colonia;
              CP = results[0].CodigoPostal;
              Delegacion = results[0].Delegacion;
              Ciudad = results[0].Ciudad;
              Estado = results[0].Estado;
              //console.log("centro: "+ id);
              //obtener los siguientes values

              connection.query('SELECT * FROM contactoemergencia WHERE UserID = ?', [UserID], (error, results) => {
                if (error) {
                  console.error('Error al ejecutar la consulta:', error);
                  res.status(500).send('Error en el servidor');
                } else {
                  const { email, password } = req.body;
                  if (results && results.length > 0) {


                    ApEmer = results[0].ApellidoPaterno;
                    AmEmer = results[0].ApellidoMaterno;
                    TelefonoEmer = results[0].Telefono;
                    Parentesco = results[0].Parentesco;
                    NombreEmer = results[0].Nombre;

                    //console.log("centro: "+ id);
                    //obtener los siguientes values

                    connection.query('SELECT * FROM fotouser WHERE UserID = ?', [UserID], (error, results) => {
                      if (error) {
                        console.error('Error al ejecutar la consulta:', error);
                        res.status(500).send('Error en el servidor');
                      } else {
                        const { email, password } = req.body;
                        if (results && results.length > 0) {


                          URL = results[0].FotoURL;

                         
                          //res.sendFile(imagePath);

                          //console.log("centro: "+ id);
                          //obtener los siguientes values
                          res.json({
                            ID: ID,
                            Nombre: Nombre,
                            Ap: AP,
                            Am: AM,
                            Edad: Edad,
                            Tel: Telefono,
                            Calle: Calle,
                            Colonia: Colonia,
                            CP: CP,
                            Ciudad: Ciudad,
                            Estado: Estado,
                            Del: Delegacion,

                            NombreEmergencia: NombreEmer,
                            ApE: ApEmer,
                            AmE: AmEmer,
                            TelEmer: TelefonoEmer,
                            Parentesco: Parentesco,
                            URL: URL

                          });

                        } else {
                          res.sendStatus(401); // No autorizado
                        }
                      }
                    });


                  } else {
                    res.sendStatus(401); // No autorizado
                  }
                }
              });

            } else {
              res.sendStatus(401); // No autorizado
            }
          }
        });


      } else {
        res.sendStatus(401); // No autorizado
      }
    }
  });

}


//----------------------------------------------------------------------OBTENER TABLA
function getTableUser(req, res) {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results);
    }
  });
}







module.exports = {
  GetCentroID,
  InsertNewUserInfoPersonal,
  InsertNewUserInfoContact,
  InsertNewUserInfoEmergencia,
  InsertNewUserPhoto,
  obtenerResumenUserNew,
  getTableUser
};







