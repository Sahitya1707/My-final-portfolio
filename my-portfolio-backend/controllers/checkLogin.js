const AdminData = require("../modals/adminLogin");
const bcrypt = require("bcryptjs");

const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  AdminData.findOne({ email: req.body.email }).then((loginData) => {
    if (loginData) {
      const hashedPassword = loginData.password;
      console.log(loginData);
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          console.log("true");
        }
        if (err) {
          console.log("Error", err);
        } else {
          res.status(401).send({ message: "Invalid Credentials" });
        }
      });
    } else {
    }
  });
  // console.log();

  //logic here
};

module.exports = {
  checkLogin,
};
