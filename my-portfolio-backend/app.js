const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");

const clientDomain = process.env.CLIENT_DOMAIN;

// setting the port
const port = process.env.PORT || 6001;

//
connectDB();

// bypassing the cors policy for client
app.use(
  cors({
    origin: clientDomain,
    credentials: true,
  })
);

app.listen(port, () => {
  console.log("App running on port 5001");
});
app.use(express.json());
