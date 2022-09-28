const path = require('path');
const nodemailer = require('nodemailer');
const hns = require('nodemailer-express-handlebars');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use(
  'compile',
  hns({
    viewEngine: {
      layoutsDir: path.join(__dirname, '../views/email'),
      defaultLayout: 'index',
    },
    viewPath: 'views/email',
  })
);

const sendEmail = async (order) => {
  await new Promise(() => {
    transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: order.contacts.email,
      subject: 'Elekta Store New Order',
      template: 'index',
      context: {
        ...order,
        client_url: process.env.CLIENT_URL,
      },
    });
  });
};

module.exports = { sendEmail };
