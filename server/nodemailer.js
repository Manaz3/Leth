const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'jaida.lockman@ethereal.email',
    pass: 'eWXdynH4PeRpEurfjp',
  },
});