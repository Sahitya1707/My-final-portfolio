const MenuData = require("../modals/menu");

const addMenu = (req, res, next) => {
  console.log(req.body);
  console.log("menu called as well");
};

module.exports = addMenu;
