'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// configuramos transport de nodemailer
const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

const usuarioSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

usuarioSchema.methods.sendEmail = async function(from, subject, text) {
  if (process.env.SIMULATE_EMAILS_TO_EXAMPLE_COM !== 'false' && this.email.includes('@example.com')) {
    console.log(`Simulado envio de un email a ${this.email} con asunto ${subject}`);
    return;
  }

  return transport.sendMail({
    to: this.email,
    from: from,
    subject: subject,
    text: text
  });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
