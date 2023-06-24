const connection = require('../../SQL_CONECTION');

//-----------------------------------------------------------loggin super usuario
function AuthSU(req, res, username) {
    connection.query('SELECT * FROM superusuarios WHERE Username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            const { email, password } = req.body;
            if (results && results.length > 0) {
                const usr = results[0].Username;
                const pass = results[0].Contraseña;
                if (email === usr && password === pass) {
                    res.sendStatus(200); // Autenticación exitosa
                } else {
                    res.sendStatus(401); // No autorizado
                }
            } else {
                res.sendStatus(401); // No autorizado
            }
        }
    });
}

//-----------------------------------------------------------loggin super usuario




module.exports = {
    AuthSU
};
