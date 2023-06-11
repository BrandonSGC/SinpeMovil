const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Ruta para mostrar el formulario HTML
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'banco.html'));
});

// Ruta para mostrar el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

// Resto del código...

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
