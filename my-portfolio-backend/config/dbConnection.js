const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongo.connect(db, {});

    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
