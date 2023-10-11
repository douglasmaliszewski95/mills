import mailer from "nodemailer";

export const transporter = mailer.createTransport({ 
  host: process.env.AWS_SES_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_USER_ID,
    pass: process.env.AWS_SES_ACCESS_KEY
  }
});
