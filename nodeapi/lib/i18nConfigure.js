'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function() {

  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true,
    syncFiles: true,
    cookie: 'nodeapi-lang' // usar locale de esta cookie
  });

  i18n.setLocale('en'); // locale por defecto para scripts

  return i18n;
}