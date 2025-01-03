const mongoose = require("mongoose");

const techSchema = new mongoose.Schema(
  {
    techImgName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tech = mongoose.model("tech", techSchema);

module.exports = Tech;
