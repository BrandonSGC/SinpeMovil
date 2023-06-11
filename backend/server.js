const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const dbConfig = {
  server: 'localhost',
  user: 'sa',
  password: 'root',
  database: 'SinpeMovil',
};

// Ruta para manejar las solicitudes POST del formulario
app.post('/formulario', async (req, res) => {
  const { nombre, estado } = req.body;

  try {
    // Establecer conexión con la base de datos
    await sql.connect(dbConfig);

    // Insertar los datos en la tabla Bancos
    const query = `INSERT INTO Bancos (nombre, estado) VALUES (@nombre, @estado)`;
    const result = await sql.query(query, {
      nombre,
      estado,
    });

    res.status(200).send('Datos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).send('Ocurrió un error al insertar los datos');
  } finally {
    // Cerrar la conexión con la base de datos
    sql.close();
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
