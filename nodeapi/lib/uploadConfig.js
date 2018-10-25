'use strict';

const multer = require('multer');
const path = require('path');

// Multer upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // aqui podría elegir la ruta dinámicamente
    cb(null, path.join(__dirname, '..', 'uploads'));
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({ storage: storage });
