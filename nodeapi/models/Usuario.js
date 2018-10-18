'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// configuramos transport de nodemailer
const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'javierkeepcoding',
    pass: 'Test1234'
  }
});

// transport.sendMail({
//   to: 'jamg44@gmail.com',
//   from: 'NodeAPI <admin@nodeapi.com>',
//   subject: 'Compra confirmada',
//   text: 'Tu compra ha sido verificada'
// });

const usuarioSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

usuarioSchema.methods.sendEmail = function() {

}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
