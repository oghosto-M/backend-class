const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
    },
    lastname: {
      type: String,
      min: 2,
    },
    email: {
      type: String,
      required: [true, "the email must exist"],
      min: [10, "the email must have at least 10 letters"],
    },
    password: {
      type: String,
      min: [5, "the password must have at least 5 letters"],
      required: [true, "the password must exist"],
    },
  },
  { timestamps: true, versionKey: false }
);

const model = mongoose.model("user", userModel);

module.exports = model;
