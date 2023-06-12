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
const { insertarCliente } = require('./database.js');
const { insertarCuentaCliente } = require('./database.js');

const { obtenerBancos } = require('./database.js');
const { obtenerTiposCuentas } = require('./database.js');
const { obtenerTipoMoneda } = require('./database.js');
const { obtenerCedulaCliente } = require('./database.js');
const { obtenerIdCliente } = require('./database.js');
const { obtenerSaldoCuenta } = require('./database.js');

const { actualizarSaldoCuenta } = require('./database.js');

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
  // Envía una respuesta al cliente.
  res.send('Datos recibidos y guardados correctamente.');

});


// Ruta para mostrar crearCliente.html.
app.get('/crearCliente', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/crearCliente.html'));
});
app.post('/crearCliente', async (req, res) => {
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const primerApellido = req.body.primerApellido;
  const segundoApellido = req.body.segundoApellido;
  await insertarCliente(cedula, nombre, primerApellido, segundoApellido);
  // Envía una respuesta al cliente.
  res.send('Datos recibidos y guardados correctamente.');
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
  // Accedemos a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const id_banco = req.body.banco;
  const cedula = req.body.cedulaCliente;
  const cod_cuenta = req.body.tipoCuenta;
  const id_moneda = req.body.tipoMoneda;
  const num_cuenta = req.body.num_cuenta;
  const saldo = req.body.saldoInicial;

  // Llama a la función obtenerIdCliente del archivo database.js
  const id_cliente = await obtenerIdCliente(cedula);

  // Si no se encontró un cliente con la cédula proporcionada, devuelve un error
  if (!id_cliente) {
    res.status(400).send('No se encontró un cliente con la cédula proporcionada');
    return;
  }
  
  await insertarCuentaCliente(id_banco, id_cliente, cedula, cod_cuenta, id_moneda, num_cuenta, saldo);
  // Envía una respuesta al cliente.
  res.send('Datos recibidos y guardados correctamente.');
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


app.get('/obtenerCedulaCliente', async (req, res) => {
  try {
    // Obtenemos los datos de los bancos
    const cedulaCliente = await obtenerCedulaCliente();
    // Enviamos el array de objetos en JSON.
    res.json(cedulaCliente);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos del cliente.');
  }
});


app.post('/realizarDeposito', async (req, res) => {
  const numCuenta = req.body.numCuenta;
  const monto = req.body.monto;

  try {
    // Obtener el saldo actual de la cuenta desde la base de datos
    const saldoActual = await obtenerSaldoCuenta(numCuenta);

    // Calcular el nuevo saldo después del depósito
    const nuevoSaldo = parseInt(saldoActual) + parseInt(monto);

    // Actualizar el saldo en la base de datos
    await actualizarSaldoCuenta(numCuenta, nuevoSaldo);

    res.send('Depósito realizado correctamente');
  } catch (error) {
    console.error('Error al realizar el depósito:', error);
    res.status(500).send('Error al realizar el depósito');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});