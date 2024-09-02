import nodemailer from 'nodemailer';
import { EmailOptions, SendMailOptions } from '../interfaces/email';

const sendMail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  })
  //  const image = `<img src="cid:image@nodemailer.com" alt="image">`
  const emailOptions : SendMailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<div style="background-color:#F6F5F5;padding:2%;margin:2%"><h1>${options.subject}</h1><p>${options.message}</p></div>`,
    // attachments: [{
    //   filename: 'image.png',
    //   path: './public/images/image.png',
    //   cid: 'cid:image@nodemailer.com'
    // }]
  };
  await transporter.sendMail(emailOptions)
};

export default sendMail;
