
const connection = require('../../SQL_CONECTION');

//-----------------------------------------------------------loggin super usuario
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


module.exports = {
    GetCentroID
};
