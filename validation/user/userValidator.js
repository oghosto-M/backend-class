const validator = require("fastest-validator");

const v = new validator();

const schema = {
  name: {
    type: "string",
    min: 2,

    messages: {
      string: "the name must be string",
      minString: "the name must have at least 2 letters",
    },
  },
  lastname: {
    type: "string",
    min: 2,

    messages: {
      string: "the lastname must be string",
      minString: "the lastname must have at least 2 letters",
    },
  },
  email: {
    type: "string",
    required: true,
    min : 10,
    pattern : /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
    messages: {
        string : "the email must be string",
        stringMin : "the email must have at least 10 letters",
        pattern : "the main must be email"
    },
  },
  password: {
    type: "string",
    min: 5,
    required: true,
    messages: {
      string: "the name must be string",
      stringMin: "the name must have at least 5 letters",
    },
  },
  confirmPassword: {  
    type: "equal",
    field: "password",
    required: true,  
  },  
};


const userValidator = v.compile(schema)

module.exports = userValidator