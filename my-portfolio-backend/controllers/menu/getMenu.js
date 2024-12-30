const menuData = require("../../modals/menu");

const getMenu = async (req, res, next) => {
  try {
    const data = await menuData.find();
    res.json({
      data: data,
      success: true,
      message: "Your data has been saved.",
    });
  } catch (err) {
    console.log(err, err.message);
  }
};
module.exports = getMenu;
