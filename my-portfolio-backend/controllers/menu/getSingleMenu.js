const MenuData = require("../../modals/menu");

const getSingleMenu = async (req, res) => {
  console.log("menu has been hit");
  const id = req.params.id;

  try {
    const menu = await MenuData.findById(id); // Use await to resolve the Promise
    if (!menu) {
      return res.status(404).json({ status: false, message: "Menu not found" });
    }
    res.json({
      data: menu,
      status: true,
      message: "Menu fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = getSingleMenu;
