'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
  console.error('Error de conexión', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log('Conectado a MongoDB en', conn.name);
});

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, { useNewUrlParser: true });

module.exports = conn;
