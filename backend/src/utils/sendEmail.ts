import * as nodemailer from 'nodemailer';

export const sendEmail = async (email: string, link: string) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_API_KEY
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Food" <email@example.com>',
    to: email,
    subject: "Hello!",
    text: "Helloooo",
    html: `<h1>Welcome</h1><br/><a href="${link}">Confirm your email here</a>`
  });

  console.log("Message sent: %s", info.messageId);


}