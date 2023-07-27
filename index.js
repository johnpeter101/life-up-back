const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
const multer = require('multer'); // Middleware para manejar archivos en formularios
// Configuración de CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

const destinoFoto="uploads";
// Configuración de multer para guardar la imagen en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './'+destinoFoto); // Carpeta donde se guardarán las imágenes, asegúrate de crearla
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // Nombre de archivo único
  }
});

const upload = multer({ storage });




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

//INSERTAR USUARIOS AL CENTRRO
const { 
  GetCentroID, 
  InsertNewUserInfoPersonal,
  InsertNewUserInfoContact,
  InsertNewUserInfoEmergencia,
  InsertNewUserPhoto,
  obtenerResumenUserNew,
  getTableUser
} = require('./database_Conections/Users/UserModule');

const {obtenerTest} = require('./database_Conections/test');
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////----------------> INSERT USER
//------------------------------------------------------------- obtiene el numero de usuario ultimo
app.post('/api/GetCentroID', async (req, res) => {
  //Método OBTENER EL CENTRO
  const { ID_Personal } = req.body;
  //console.log("personal: "+ID_Personal);
  GetCentroID(req, res, ID_Personal);
});

//------------------------------------------------------------- Ruta de insertar usuarios info personal
app.post('/api/addInformationPersonalUser', async (req, res) => {
  //Método para autenticar el super usuario
  const formData = req.body;

  InsertNewUserInfoPersonal(req, res, formData);
});

//------------------------------------------------------------- Ruta de insertar usuarios info personal contacto, tabla direcciones
app.post('/api/addInformationContactUser', async (req, res) => {
  //Método para autenticar el super usuario
  const formData = req.body;
  InsertNewUserInfoContact(req, res, formData);
});

//------------------------------------------------------------- Ruta de insertar usuarios info personal emergencia
app.post('/api/addInformationEmergencyUser', async (req, res) => {
  //Método para autenticar el super usuario
  const formData = req.body;

  InsertNewUserInfoEmergencia(req, res, formData);
});


//------------------------------------------------------------- Ruta de insertar usuarios info personal emergencia
app.post('/api/addUserPhoto', upload.single('userPhoto'), (req, res) => {
  
  console.log('si entro')
  try {
    const userId = req.body.userId;
    //console.log('ID de usuario:', userId);
    ///console.log('Nombre del archivo:', req.file.filename);
    const ruta="./"+destinoFoto+'/'+req.file.filename;
   // console.log('destino: ' , ruta);
    //res.status(200).json({ message: 'Imagen subida correctamente.' });

    const UserID=userId;
    const FotoURL=	ruta;
    const formData= {
      UserID,
      FotoURL	
    }

    InsertNewUserPhoto(req, res, formData);
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen.' });
  }
});
 // 


 app.post('/api/obtenerInfoNuevoUser', async (req, res) => {
  //Método para autenticar el super usuario
  //getListCentros(req, res);

  obtenerResumenUserNew(req, res);
  //console.log("hola ")
});



//------------------------------------------------------------- Ruta de obtener tabla de usuarios 
app.get('/api/tableUsers', async (req, res) => {
  //Método para autenticar el super usuario
  getTableUser(req, res);
});



app.get('/getImageUser', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'uploads', 'foto.png');
  res.sendFile(imagePath);
});























//endpoint test
app.post('/test', (req, res, ) => {
  const { dato } = req.body;
  //llamar a la funcion de busqueda
  obtenerTest(req, res, dato);
});











//_----------------------------------------------------------------------------
// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express en funcionamiento en el puerto 3000');
});
