const MenuData = require("../modals/menu");

const addMenu = async (req, res, next) => {
  console.log("Menu has been called");
  try {
    const { name, link } = req.body;
    const existingMenu = await MenuData.findOne({ name: name });
    if (existingMenu) {
      // If the item exists, respond with an appropriate message
      return res.status(400).json({ message: "Menu item already exists" });
    }
    const newMenu = new MenuData({
      name: name.toLowerCase(),
      link: link.toLowerCase(),
    });

    await newMenu.save();
    res
      .status(201)
      .json({ message: "Menu item added successfully", data: newMenu });
    console.log("saved");
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      return res
        .status(400)
        .json({ message: "Menu item already exists", error: err.keyValue });
    }

    console.log("err");
    // console.log(err);
  }
};

module.exports = addMenu;
