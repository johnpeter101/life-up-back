const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

// Configuración de CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

//require functions
const { AuthSU } = require('./database_Conections/SuperUsuarios/LoginSU_sql');
const { getTable } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { insertUser } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { getListCentros } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { getNumeroDeUsuarios } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { incrementUser } = require('./database_Conections/SuperUsuarios/DashboardSU');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////----------------> SUPER USUARIOS
//------------------------------------------------------------- Ruta de inicio de sesión de super usuarios
app.post('/api/login', async (req, res) => {
  //Obtener el body
  const { email, password } = req.body;
  //Método para autenticar el super usuario
  AuthSU(req, res, email);
});
//------------------------------------------------------------- Ruta de obtener tabla de usuarios y roles
app.get('/api/tableRol', async (req, res) => {
  //Método para autenticar el super usuario
  getTable(req, res);
});
//------------------------------------------------------------- obtiene lista de centros y ids
app.get('/api/GetCentros', async (req, res) => {
  //Método para autenticar el super usuario
  getListCentros(req, res);
});
//------------------------------------------------------------- obtiene el numero de usuario ultimo
app.get('/api/GetNumUser', async (req, res) => {
  //Método para autenticar el super usuario
  getNumeroDeUsuarios(req, res);
});
//------------------------------------------------------------- Ruta de insertar usuarios super
app.post('/api/AddUser', async (req, res) => {
  //Método para autenticar el super usuario
  const formData = req.body;
  insertUser(req, res, formData);
});
//------------------------------------------------------------- Ruta de incremenmto en numero de usuarios
app.post('/api/IncrementUSerNum', async (req, res) => {
  //Método para autenticar el super usuario
  const Data = req.body;
  incrementUser(req, res, Data);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////----------------> LOGIN PERSONAL









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
