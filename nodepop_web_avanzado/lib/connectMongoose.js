'use strict'

const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.Promise = global.Promise

db.on('error', function (err) {
  console.error('mongodb connection error:', err)
  process.exit(1)
})

db.once('open', function () {
  console.info('Connected to mongodb on', mongoose.connection.name)
})

mongoose.connect('mongodb://localhost/nodepop', {
  useMongoClient: true
})

module.exports = db
