'use strict';

// cargamos el driver
const mysql = require('mysql');

// crear la conexión
const conexion = mysql.createConnection({
  host: 'didimo.es',
  user: 'usuariocurso',
  password: 'us3r',
  database: 'cursonode'
});

// conectar
conexion.connect((err) => {
  
  if (err) {
    console.log('Error de conexión', err);
    process.exit(1);
  }

  // lanzar consulta
  conexion.query('SELECT * FROM agentes', (err, rows, fields) => {
    if (err) {
      console.log('Hubo un error', err);
      process.exit(1);
    }
    console.log(rows);
  });

});

