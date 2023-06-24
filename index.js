const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

// Configuración de CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

//require functions
const { AuthSU } = require('./database_Conections/LoginSuperUsuarios/LoginSU_sql');
const { getTable } = require('./database_Conections/LoginSuperUsuarios/DashboardSU');


//------------------------------------------------------------- Ruta de inicio de sesión de super usuarios
app.post('/api/login', async (req, res) => {
  //Obtener el body
  const { email, password } = req.body;
  //Método para autenticar el super usuario
  AuthSU(req, res, email);
});
//------------------------------------------------------------- Ruta de obtener tabla de usuarios y roles
app.post('/api/tableRol', async (req, res) => {
  //Método para autenticar el super usuario
  getTable(req, res);
});






//-------------------------------------------------funcion de prueva para visualizar contenido

app.get('/datos/:username', (req, res) => {
  const username = req.params.username;
  AuthSU(req, res, username);
});

app.get('/api/tabla', getTable);



//_----------------------------------------------------------------------------
// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express en funcionamiento en el puerto 3000');
});
