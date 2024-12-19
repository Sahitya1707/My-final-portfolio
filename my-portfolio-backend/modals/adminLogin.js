const mongoose = require("mongoose");

const adminLoginSchema = new mongoose.Schema({
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
});

// creating model

const AdminLogin = mongoose.model("adminLogin", adminLoginSchema);

// exporting the module
module.export = AdminLogin;
