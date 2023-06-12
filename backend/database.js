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
// Guardar tipo de cambio.
async function insertarMoneda(nombreMoneda) {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('nombreMoneda', sql.VarChar(30), nombreMoneda)
      .query('INSERT INTO Moneda (descripcion) VALUES (@nombreMoneda)');

    pool.close();
  } catch (error) {
    console.error('Error al insertar los datos de la moneda:', error);
    throw error;
  }
}
// Guardar tipo de cambio.
async function insertarTipoCuenta(tipoCuenta) {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('tipoCuenta', sql.VarChar(50), tipoCuenta)
      .query('INSERT INTO Cuentas (descripcion) VALUES (@tipoCuenta)');

    pool.close();
  } catch (error) {
    console.error('Error al insertar los datos del tipo de cuenta:', error);
    throw error;
  }
}

async function insertarCliente(cedula, nombre, primerApellido, segundoApellido) {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('cedula', sql.Int, cedula)
      .input('nombre', sql.VarChar(30), nombre)
      .input('primerApellido', sql.VarChar(30), primerApellido)
      .input('segundoApellido', sql.VarChar(30), segundoApellido)
      .query('INSERT INTO Clientes (cedula, nombre, apellido1, apellido2) VALUES (@cedula,@nombre, @primerApellido, @segundoApellido)');      
    pool.close();
  } catch (error) {
    console.error('Error al insertar los datos del tipo de cuenta:', error);
    throw error;
  }
}


// Función para obtener los registros de la tabla Banco
async function obtenerBancos() {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Banco');
    return result.recordset;
  } catch (error) {
    throw error;
  } finally {
    sql.close();
  }
}

async function obtenerTiposCuentas() {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Cuentas');
    return result.recordset;
  } catch (error) {
    throw error;
  } finally {
    sql.close();
  }
}


async function obtenerTipoMoneda() {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Moneda');
    return result.recordset;
  } catch (error) {
    throw error;
  } finally {
    sql.close();
  }
}

async function obtenerCedulaCliente() {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Clientes');
    return result.recordset;
  } catch (error) {
    throw error;
  } finally {
    sql.close();
  }
}


// Exportamos las funciones
module.exports = {
    insertarBanco,
    insertarTipoCambio,
    insertarMoneda,
    insertarTipoCuenta,
    insertarCliente,
    obtenerBancos,
    obtenerTiposCuentas,
    obtenerTipoMoneda,
    obtenerCedulaCliente,
};
