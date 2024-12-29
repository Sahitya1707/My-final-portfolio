const MenuData = require("../../modals/menu");

const editMenu = async (req, res) => {
  console.log("edit menu called");
  const id = req.params.id;
  console.log(req.body);
  try {
    await MenuData.findByIdAndUpdate(id, {
      menuName: req.body.name,
      menuLink: req.body.link,
    });
    res.send("Item Updated");
  } catch (err) {
    console.log(err.message);
    res.send(400).send("Server Error");
  }
};

module.exports = editMenu;
