const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILSENDER,
    pass: process.env.PASSWORD,
  },
});
