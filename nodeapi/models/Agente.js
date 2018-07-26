'use strict';

const mongoose = require('mongoose');

// definir un esquema
const agenteSchema = mongoose.Schema({
  name: String,
  age: Number
});

// creamos un método estático
agenteSchema.statics.listar = function(filtro, limit, skip, fields, sort) {
  const query = Agente.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}

// crear el modelo con ese esquema
const Agente = mongoose.model('Agente', agenteSchema);

// y aunque no haga falta, lo exportamos
module.exports = Agente;
