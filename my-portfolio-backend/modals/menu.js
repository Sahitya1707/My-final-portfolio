const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    require: true,
    unique: true,
  },
  menuLink: {
    type: String,
    require: true,
    unique: true,
  },
});

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;
