const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");

const clientDomain = process.env.CLIENT_DOMAIN;
const loginRoute = require("./routes/admin/admin");
const cookieParser = require("cookie-parser");

// setting the port
const port = process.env.PORT || 6001;

app.use(cookieParser());

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
  console.log(`App running on port ${port}`);
});
app.use(express.json());

app.use("/admin", loginRoute);
