const nodemailer = require("nodemailer");

const sendEmails = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `E-Comm <no-reply@ecomm.com>`,
    to: options.email,
    date: new Date(),
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(message);
};

module.exports = sendEmails;
