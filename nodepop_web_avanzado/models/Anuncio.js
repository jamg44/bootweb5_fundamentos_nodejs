'use strict'

const mongoose = require('mongoose')
const fs = require('fs-extra')
const flow = require('../lib/flowControl')
const configAnuncios = require('../local_config').anuncios
const path = require('path')
const cote = require('cote')

const thumbnailRequester = new cote.Requester({
  name: 'thumbnail creator client'
}, { log: false, statusLogsEnabled: false })

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, index: true },
  foto: String,
  tags: { type: [String], index: true }
})

/**
 * lista de tags permitidos
 */
anuncioSchema.statics.allowedTags = function () {
  return ['work', 'lifestyle', 'motor', 'mobile']
}

/**
 * carga un json de anuncios
 */
anuncioSchema.statics.cargaJson = function (fichero, cb) {
  // Encodings: https://nodejs.org/api/buffer.html
  fs.readFile(fichero, { encoding: 'utf8' }, function (err, data) {
    if (err) return cb(err)

    console.log(fichero + ' leido.')

    if (data) {
      const anuncios = JSON.parse(data).anuncios
      const numAnuncios = anuncios.length

      flow.serialArray(anuncios, Anuncio.createRecord, (err) => {
        if (err) return cb(err)
        return cb(null, numAnuncios)
      })
    } else {
      return cb(new Error(__('empty_file', { file: fichero })))
    }
  })
}

anuncioSchema.statics.createRecord = function (nuevo, cb) {
  new Anuncio(nuevo).save(cb)
}

anuncioSchema.statics.list = async function (filters, startRow, numRows, sortField, includeTotal, cb) {
  const query = Anuncio.find(filters)
  query.sort(sortField)
  query.skip(startRow)
  query.limit(numRows)
  // query.select('nombre venta');

  const result = {}

  if (includeTotal) {
    result.total = await Anuncio.count()
  }
  result.rows = await query.exec()

  // poner ruta base a imagenes
  const ruta = configAnuncios.imagesURLBasePath
  result.rows.forEach(r => (r.foto = r.foto ? path.join(ruta, r.foto) : null))

  if (cb) return cb(null, result) // si me dan callback devuelvo los resultados por ahí
  return result // si no, los devuelvo por la promesa del async (async está en la primera linea de esta función)
}

anuncioSchema.methods.setFoto = async function (imageObject) {
  if (!imageObject) return
  // copiar el fichero desde la carpeta uploads a public/images/anuncios
  // usando en nombre original del producto
  // IMPORTANTE: valorar si quereis poner el _id del usuario (this._id) para
  // diferenciar imagenes de distintos usuarios con el mismo nombre
  const dstPath = path.join(__dirname, '../public/images/anuncios', imageObject.originalname)
  await fs.copy(imageObject.path, dstPath)
  this.foto = imageObject.originalname
  thumbnailRequester.send({
    type: 'createThumbnail',
    image: dstPath
  })
}

var Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio
