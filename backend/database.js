// Este archivo vamos a tener la configuración de la base de datos 
// y la lógica relacionada.

const sql = require('mssql');

// Configuración de la conexión a la base de datos
const config = {
  user: 'sa',
  password: 'root',
  server: 'localhost',
  database: 'SinpeMovil',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Creamos la funcion asincrona de insertar banco. Para
// posteriormente exportarla al index.js
async function insertarBanco(nombre, estado) {
    try {
      const pool = await sql.connect(config);
  
      await pool.request()
        .input('nombre', sql.VarChar(60), nombre)
        .input('estado', sql.VarChar(1), estado)
        .query('INSERT INTO Banco (nombre, estado) VALUES (@nombre, @estado)');
  
      pool.close();
    } catch (error) {
      console.error('Error al insertar los datos del Banco:', error);
      throw error;
    }
}

// Guardar tipo de cambio.
async function insertarTipoCambio(fecha, valor) {
    try {
      const pool = await sql.connect(config);

      await pool.request()
        .input('fecha', sql.Date, fecha)
        .input('valor', sql.Int, valor)
        .query('INSERT INTO Tipo_Cambio (fecha, cambio) VALUES (@fecha, @valor)');
  
      pool.close();
    } catch (error) {
      console.error('Error al insertar los datos del Tipo de Cambio:', error);
      throw error;
    }
}
  
// Exportamos la funcion insertarBanco
module.exports = {
    insertarBanco,
    insertarTipoCambio,
};
