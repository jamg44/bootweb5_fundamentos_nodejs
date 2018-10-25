'use strict';

// Servicio de cambio de moneda

const cote = require('cote');

const responder = new cote.Responder({ name: 'currency conversion responder' });

// tabla de conersión
// simboliza el almacén de datos del microservicio
const rates = {
  usd_eur: 0.88,
  eur_usd: 1.12
};

// petición (req): { from: 'eur', to: 'usd', amount: 25 }
responder.on('convert', (req, done) => {
  console.log('servicio: petición de', req.from, req.to, req.amount, Date.now());

  // calculamos el resultado
  const result = rates[`${req.from}_${req.to}`] * req.amount;
  done(result);
});
