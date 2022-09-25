const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        resolve(console.log('DB was connected'));
      })
      .catch((e) => {
        reject(console.log(e));
      });
  });
};

module.exports = connectDB;
