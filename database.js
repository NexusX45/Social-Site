const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((connection) => {
      console.log(connection.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
