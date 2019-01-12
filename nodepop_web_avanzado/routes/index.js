'use strict'

const router = require('express').Router()
const fs = require('fs')
const path = require('path')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const filename = path.join(__dirname, '../README.md')
    const readme = await new Promise((resolve, reject) =>
      fs.readFile(filename, 'utf8', (err, data) => err ? reject(err) : resolve(data))
    )
    res.render('index', { readme })
  } catch (err) { return next(err) }
})

module.exports = router
