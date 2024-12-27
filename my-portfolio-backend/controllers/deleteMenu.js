const menuData = require("../modals/menu");

const deleteMenu = async (req, res) => {
  const id = req.params.id;
  try {
    const removeMenu = await menuData.findByIdAndDelete(id);
    console.log(removeMenu);
    // sending all menu data to frontend
    const allMenu = await menuData.find();
    if (removeMenu) {
      res.json({
        status: true,
        message: "Successfully deleted",
        data: allMenu,
      });
    }
  } catch (err) {
    console.log("failed to delete");
  }
};

module.exports = deleteMenu;
