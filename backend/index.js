// Este es el archivo principal donde configuramos el servidor, 
// manejamos las rutas y ejecutamos el servidor.

const express = require('express');;
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const { insertarBanco } = require('./database.js');

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
  
  // Aquí puedes acceder a los datos enviados desde el formulario
  // mediante el atributo name de los inputs.
  const nombreBanco = req.body.nombreBanco;
  const estado = req.body.estado;

  await insertarBanco(nombreBanco, estado);
  // Envía una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('Datos del formulario recibidos y procesados correctamente.');

});



// Resto del código...

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
