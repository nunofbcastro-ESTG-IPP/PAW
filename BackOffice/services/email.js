var nodemailer = require('nodemailer');

const sendEmail = (to, subject, mensage) => {
  let isSendedAll = true;

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    service: 'outlook', // service name
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3', // tls version
    },
    port: 587,
    auth: {
      user: process.env.email,
      pass: process.env.emailPassword,
    },
  });

  for (let t of to) {
    console.log(t.clientEmail);
    let mailOptions = {
      from: process.env.email,
      to: t.clientEmail,
      subject: subject,
      text: mensage,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        isSendedAll = false;
      }
    });
  }
  return isSendedAll;
};

module.exports = {
  sendEmail,
};
