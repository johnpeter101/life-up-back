const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
// Configuración de CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//require functions
//super usuarios
const { AuthSU } = require('./database_Conections/SuperUsuarios/LoginSU_sql');
const { getTable } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { insertUser } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { getListCentros } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { getNumeroDeUsuarios } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { incrementUser } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { getInfoUser } = require('./database_Conections/SuperUsuarios/DashboardSU');
const { deleteUser } = require('./database_Conections/SuperUsuarios/DashboardSU');
//login normal
const { AuthNormal } = require('./database_Conections/login');


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
//------------------------------------------------------------- obtiene la informacion del personal en base a su id
app.post('/api/UserSearch', async (req, res) => {
  //Método para autenticar el super usuario
  const ID = req.body.ID;
  getInfoUser(req, res, ID);
});
//------------------------------------------------------------- obtiene la informacion del personal en base a su id
app.post('/api/DeleteUser', async (req, res) => {
  //Método para autenticar el super usuario
  const ID = req.body.ID;
  deleteUser(req, res, ID);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////----------------> LOGIN PERSONAL
app.post('/api/loginNormal', (req, res) => {
  //Obtener el body
  
  const { email, password } = req.body;
  //Método para autenticar el super usuario
  AuthNormal(req, res, email);
});































//_----------------------------------------------------------------------------
// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express en funcionamiento en el puerto 3000');
});
