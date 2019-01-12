'use strict'

const multer = require('multer')
const path = require('path')

// Multer uploads config
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

module.exports = multer({ storage: storage })
