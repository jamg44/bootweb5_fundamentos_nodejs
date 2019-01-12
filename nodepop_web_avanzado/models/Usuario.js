'use strict'

const mongoose = require('mongoose')
var hash = require('hash.js')

const usuarioSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
})

usuarioSchema.statics.hashPassword = function (plain) {
  return hash.sha256().update(plain).digest('hex')
}

var Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
