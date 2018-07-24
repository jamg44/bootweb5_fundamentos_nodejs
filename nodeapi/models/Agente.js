'use strict';

const mongoose = require('mongoose');

// definir un esquema
const agenteSchema = mongoose.Schema({
  name: String,
  age: Number
});

// crear el modelo con ese esquema
const Agente = mongoose.model('Agente', agenteSchema);

// y aunque no haga falta, lo exportamos
module.exports = Agente;
