const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: true,
      unique: true,
    },
    menuLink: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;
