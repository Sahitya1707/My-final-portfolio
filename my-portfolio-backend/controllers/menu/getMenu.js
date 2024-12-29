const menuData = require("../../modals/menu");

const getMenu = async (req, res, next) => {
  try {
    const data = await menuData.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getMenu;
