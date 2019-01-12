'use strict'

const mongoose = require('mongoose')
const readLine = require('readline')
const async = require('async')
require('./lib/i18nSetup')

const db = require('./lib/connectMongoose')

// Cargamos las definiciones de todos nuestros modelos
require('./models/Anuncio')

db.once('open', function () {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Are you sure you want to empty DB? (no) ', function (answer) {
    rl.close()
    if (answer.toLowerCase() === 'yes') {
      runInstallScript()
    } else {
      console.log('DB install aborted!')
      return process.exit(0)
    }
  })
})

function runInstallScript () {
  async.series([
    initAnuncios,
    initUsuarios
  ], (err) => {
    if (err) {
      console.error(__('generic', { err }))
      return process.exit(1)
    }

    return process.exit(0)
  }
  )
}

function initAnuncios (cb) {
  const Anuncio = mongoose.model('Anuncio')

  Anuncio.remove({}, () => {
    console.log('Anuncios borrados.')

    // Cargar anuncios.json
    const fichero = './anuncios.json'
    console.log('Cargando ' + fichero + '...')

    Anuncio.cargaJson(fichero, (err, numLoaded) => {
      if (err) return cb(err)

      console.log(`Se han cargado ${numLoaded} anuncios.`)
      return cb(null, numLoaded)
    })
  })
}

function initUsuarios (cb) {
  const Usuario = require('./models/Usuario')

  Usuario.remove({}, () => {
    console.log('Usuarios borrados.')

    Usuario.insertMany([
      {name: 'user', email: 'user@example.com', password: Usuario.hashPassword('1234')},
      {name: 'user2', email: 'user2@example.com', password: Usuario.hashPassword('1234')}
    ], (err, loaded) => {
      if (err) return cb(err)

      console.log(`Se han cargado ${loaded.length} usuarios.`)
      return cb(null, loaded)
    })
  })
}
