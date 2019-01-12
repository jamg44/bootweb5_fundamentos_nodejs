'use strict'

const Anuncio = require('../models/Anuncio')
const Usuario = require('../models/Usuario')
const AnunciosData = require('../anuncios.json')

module.exports.initAnuncios = async function () {
  await Anuncio.remove()
  await Anuncio.insertMany(AnunciosData.anuncios)
}

module.exports.initUsuarios = async function () {
  await Usuario.remove()
  await Usuario.insertMany([
    {name: 'user', email: 'user@example.com', password: Usuario.hashPassword('1234')}
  ])
}
