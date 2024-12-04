const mongose = require("mongoose");
require("dotenv").config();

const connection = mongose
  .connect(process.env.URL_DB)
  .then(() => {
    console.log("connect to database successfuly");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection