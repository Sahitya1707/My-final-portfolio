const adminLoginModal = require("../modals/adminLogin");

const getLogin = (req, res) => {
  console.log("called");
  console.log(req.body);
  //logic here
};

module.exports = {
  getLogin,
};
