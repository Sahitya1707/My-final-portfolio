const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(db, {});

    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
