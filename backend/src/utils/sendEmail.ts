import * as nodemailer from 'nodemailer';

export const main = async () => {

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
    to: "bar@example.com, baz@ezamble.com",
    subject: "Hello!",
    text: "Helloooo",
    html: "<h1>HeyHey</h1>"
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}