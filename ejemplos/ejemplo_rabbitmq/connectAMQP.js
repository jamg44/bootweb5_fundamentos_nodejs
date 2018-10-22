'use strict';

const amqplib = require('amqplib');

// carga de variables de entorno desde .env
require('dotenv').config();

const url = process.env.AMQP_URL;

const connectionPromise = amqplib.connect(url)
  .catch( err => {
    console.log('[AMQP]', err);
  });

module.exports = connectionPromise;
