// Este es el archivo principal donde configuramos el servidor, 
// manejamos las rutas y ejecutamos el servidor.

const express = require('express');;
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const { insertarBanco } = require('./database.js');
const { insertarTipoCambio } = require('./database.js');
const { insertarMoneda } = require('./database.js');
const { insertarTipoCuenta } = require('./database.js');
const { obtenerBancos } = require('./database.js');
const { obtenerTiposCuentas } = require('./database.js');
const { obtenerTipoMoneda } = require('./database.js');

// Configurar el middleware body-parser.
// Se encarga de procesar y analizar esos datos en un formato 
// que sea fácil de usar en el servidor.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la entrega de archivos estáticos.
app.use(express.static(path.join(__dirname, '../frontend')));


// Routing

// Ruta para mostrar el index.HTML del inicio.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para mostrar el banco.html.
app.get('/banco', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/banco.html'));
});
// Recibir la informacion del formulario frontend e ingresarlo a la base de datos.
app.post('/guardar-banco', async (req, res) => {
  
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const nombreBanco = req.body.nombreBanco;
  const estado = req.body.estado;

  await insertarBanco(nombreBanco, estado);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('Datos recibidos y procesados correctamente.');

});


// Ruta para mostrar crearCliente.html.
app.get('/crearCliente', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/crearCliente.html'));
});



// Ruta para mostrar tipoCambio.html.
app.get('/tipoCambio', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/tipoCambio.html'));
});
app.post('/guardar-tipo-cambio', async (req, res) => {
  
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const fechaString = req.body.fecha;
  // Obtener los componentes de la fecha
  const [year, month, day] = fechaString.split("-")
  // Crear un objeto Date válido para SQL Server
  const fecha = new Date(year, month - 1, day);

  const valor = req.body.valor;

  await insertarTipoCambio(fecha, valor);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send(`Datos recibidos y procesados correctamente`);
});

app.get('/obtenerBancos', async (req, res) => {  
  try {
    // Obtenemos los datos de los bancos
    const bancos = await obtenerBancos();     
    // Enviamos el array de objetos en JSON.
    res.json(bancos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos.');
  }
});
app.post('/creaCuentaCliente', async (req, res) => {
  
});


app.get('/obtenerMoneda', async (req, res) => {
  try {
    // Obtenemos los datos de los bancos
    const tipoMoneda = await obtenerTipoMoneda();    
    // Enviamos el array de objetos en JSON.
    res.json(tipoMoneda);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos.');
  }
});
app.post('/guardar-moneda', async (req, res) => {
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const nombreMoneda = req.body.nombreMoneda;
  await insertarMoneda(nombreMoneda);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('Datos recibidos y procesados correctamente.');
});


app.get('/tipoCuentas', async (req, res) => {
  try {
    // Obtenemos los datos de los bancos
    const tipoCuentas = await obtenerTiposCuentas();
    // Enviamos el array de objetos en JSON.
    res.json(tipoCuentas);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos.');
  }
});
app.post('/guardar-tipoCuenta', async (req, res) => {
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const tipoCuenta = req.body.tipoCuenta;

  await insertarTipoCuenta(tipoCuenta);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('Datos recibidos y procesados correctamente.');
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
