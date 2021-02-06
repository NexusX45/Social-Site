const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://Nexus:Samipan@2001@cluster0.yirms.mongodb.net/database1?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then((connection) => {
      console.log(connection.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
