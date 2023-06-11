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

app.get('/crearCuenta', async (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/crearCuenta.html'));
});
app.post('/crear-cuenta-cliente', async (req, res) => {
  
});

app.get('/moneda', async (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/moneda.html'));
});
app.post('/guardar-moneda', async (req, res) => {
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const nombreMoneda = req.body.nombreMoneda;

  await insertarMoneda(nombreMoneda);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('Datos recibidos y procesados correctamente.');
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
