'use strict'

const i18n = require('i18n')
const path = require('path')

// registrar lenguajes
i18n.configure({
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  syncFiles: true,
  queryParameter: 'lang',
  register: global
})

module.exports = i18n
