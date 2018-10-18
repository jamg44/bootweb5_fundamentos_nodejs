'use strict';

const express = require('express');
const router = express.Router();

const sessionAuth = require('../lib/sessionAuth');



router.get('/', sessionAuth() , (req, res, next) => {
  res.render('privado');
});

module.exports = router;
