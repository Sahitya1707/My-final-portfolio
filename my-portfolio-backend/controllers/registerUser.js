const AdminData = require("../modals/adminLogin");

const register = async (email, password, res) => {
  const existUsername = AdminData.findOne({ email: email });
  if (existUsername) {
    console.log("username exist");
  } else {
    console.log("esle");
  }
};
module.exports = register;
