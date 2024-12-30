const MenuData = require("../../modals/menu");

const editMenu = async (req, res) => {
  const id = req.params.id;
  let allMenu = await MenuData.find();

  try {
    const exisitingMenu = await MenuData.findOne({
      menuName: req.body.name.toLowerCase(),
    });

    console.log("object");
    console.log(exisitingMenu);
    if (exisitingMenu) {
      return res.json({
        status: false,
        message: "Menu name already exist.",
        data: allMenu,
      });
    }
    await MenuData.findByIdAndUpdate(id, {
      menuName: req.body.name,
      menuLink: req.body.link,
    });
    allMenu = await MenuData.find();
    res.json({ status: true, message: "Menu Updated", data: allMenu });
  } catch (err) {
    console.log(err.message);
    res.send(400).send("Server Error");
  }
};

module.exports = editMenu;
