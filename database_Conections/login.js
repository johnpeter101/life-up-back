const connection = require('../SQL_CONECTION');




//-----------------------------------------------------------loggin super usuario
function AuthNormal(req, res, username) {
    const { email, password } = req.body;
    connection.query('SELECT * FROM personal WHERE Email = ?', [username], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            const { email, password } = req.body;
            if (results && results.length > 0) {
                const usr = results[0].Email;
                const pass = results[0].Password;
                const rol = results[0].Rol;
                const ID = results[0].PersonalID;
                //console.log("datos: "+usr+"  :  "+pass);
                if (email === usr && password === pass) {
                    res.json({ role: rol, ID: ID});
                } else {
                    res.status(401).json({ message: 'Credenciales inválidas' });               
                }
            } else {
                res.sendStatus(401); // No autorizado
            }
        }
    });
}

//-----------------------------------------------------------loggin super usuario




module.exports = {
    AuthNormal
};
