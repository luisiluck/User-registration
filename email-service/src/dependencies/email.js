const nodemailer = require("nodemailer");

const sendVerificationEmail =  async function(user) {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '1025'),
    secure: false,
  });

  const verifyUrl = `${process.env.API_HOST || 'http://localhost:3000'}/verify?t=${user.verificationToken}`;

  await transporter.sendMail({
    from: "no-reply@yourdomain.com",
    to: user.email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verifyUrl}">here</a> to verify your account.</p>`,
  });
}

module.exports = sendVerificationEmail;