'use strict'

const express = require('express')
const mongoose = require('mongoose')
const upload = require('../../lib/multerConfig')
const router = express.Router()
const Anuncio = mongoose.model('Anuncio')

router.get('/', (req, res, next) => {
  const start = parseInt(req.query.start) || 0
  const limit = parseInt(req.query.limit) || 1000 // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id'
  const includeTotal = req.query.includeTotal === 'true'
  const filters = {}
  if (typeof req.query.tag !== 'undefined') {
    filters.tags = req.query.tag
  }

  if (typeof req.query.venta !== 'undefined') {
    filters.venta = req.query.venta
  }

  if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
    if (req.query.precio.indexOf('-') !== -1) {
      filters.precio = {}
      let rango = req.query.precio.split('-')
      if (rango[0] !== '') {
        filters.precio.$gte = rango[0]
      }

      if (rango[1] !== '') {
        filters.precio.$lte = rango[1]
      }
    } else {
      filters.precio = req.query.precio
    }
  }

  if (typeof req.query.nombre !== 'undefined') {
    filters.nombre = new RegExp('^' + req.query.nombre, 'i')
  }

  Anuncio.list(filters, start, limit, sort, includeTotal).then(anuncios => {
    res.json({ ok: true, result: anuncios })
  }).catch(err => next(err))
})

router.post('/', upload.single('foto'), async (req, res, next) => {
  try {
    const anuncio = new Anuncio(req.body)

    await anuncio.setFoto(req.file) // save image

    const saved = await anuncio.save()
    res.json({ok: true, result: saved})
  } catch (err) { next(err) }
})

// Return the list of available tags
router.get('/tags', function (req, res) {
  res.json({ ok: true, allowedTags: Anuncio.allowedTags() })
})

module.exports = router
