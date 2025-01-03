const MenuData = require("../../modals/menu");
const mongoose = require("mongoose");

const addMenu = async (req, res, next) => {
  console.log("addMenu has been called");
  try {
    const { name, link } = req.body;
    // console.log(name, link);
    const existingMenu = await MenuData.findOne({
      menuName: name.toLowerCase(),
    });

    if (existingMenu === true) {
      // If the item exists, respond with an appropriate message
      return res.status(400).json({ message: "Menu item already exists" });
    }

    const newMenu = new MenuData({
      menuName: name.toLowerCase(),
      menuLink: link.toLowerCase(),
    });

    await newMenu.save();

    // sending all menu data to frontend
    const allMenu = await MenuData.find();
    return res.json({ message: "Menu item added successfully", data: allMenu });
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      return res
        .status(400)
        .json({ message: "Menu item already exists", error: err.keyValue });
    }

    console.log(err);
    // console.log(err);
  }
};

module.exports = addMenu;
