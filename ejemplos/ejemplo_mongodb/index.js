'use strict';

const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, cliente) => {
  if (err) {
    console.error('Hubo un error', err);
    return;
  }
  const cursonodeDB = cliente.db('cursonode');
  cursonodeDB.collection('agentes').find().toArray((err, docs) => {
    if (err) {
      console.error('Hubo un error', err);
      return;
    }
    console.log(docs);
    cliente.close();
  });
});