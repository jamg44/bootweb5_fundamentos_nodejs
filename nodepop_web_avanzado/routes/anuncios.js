'use strict'

const router = require('express').Router()
const Anuncio = require('mongoose').model('Anuncio')

/* GET anuncios page. */
router.get('/', async function (req, res, next) {
  try {
    const start = parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 1000 // nuestro api devuelve max 1000 registros
    const sort = req.query.sort || '_id'
    const includeTotal = true

    const filters = {}
    if (req.query.tag) {
      filters.tags = req.query.tag
    }
    if (req.query.venta) {
      filters.venta = req.query.venta
    }

    const {total, rows} = await Anuncio.list(filters, start, limit, sort, includeTotal)
    res.render('anuncios', { total, anuncios: rows })
  } catch (err) { return res.next(err) }
})

module.exports = router
