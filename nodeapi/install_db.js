'use strict';

require('dotenv').config();

const readline = require('readline');

const agentes = require('./data/agentes.json').agentes;
const conn = require('./lib/connectMongoose');
const Agente = require('./models/Agente');

conn.once('open', async () => {
  try {
    const response = await askUser('Estas seguro que quieres borrar los contenidos de la base de datos? (no)');

    if (response.toLowerCase() !== 'yes') {
      console.log('Proceso abortado');
      process.exit();
    }

    await initAgentes(agentes);
    // await initUsers();
    // await initStores();
    // ...

    //conn.close();
    // workarround - la conexión no se cierra, temporalmente hago
    process.exit();

  } catch (err) {
    console.log('Hubo un error', err);
    process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question,
      function(answer) {
        rl.close();
        resolve(answer);
      }
    );
  });
}

async function initAgentes(agentes) {
  // eliminar los documentos actuales
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.n} agentes.`);

  // cargar los nuevos documentos
  const inserted = await Agente.insertMany(agentes);
  console.log(`Insertados ${inserted.length} agentes.`);
}