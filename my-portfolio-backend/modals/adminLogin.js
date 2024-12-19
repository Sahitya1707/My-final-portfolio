const mongoose = require("mongoose");

const adminDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// creating model

const AdminData = mongoose.model("adminData", adminDataSchema);

// exporting the module
module.exports = AdminData;
