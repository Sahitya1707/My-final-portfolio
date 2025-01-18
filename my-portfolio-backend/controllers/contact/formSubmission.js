const nodemailer = require("nodemailer");

const formSubmission = (req, res) => {
  console.log("form submission .js");
  console.log(req.body);
  const { name, email, message } = req.body;
};

module.exports = formSubmission;
