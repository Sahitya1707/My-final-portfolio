const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const clientDomain = process.env.CLIENT_DOMAIN;
const loginRoute = require("./routes/admin/admin");
const dataRoute = require("./routes/admin/menu");
const techRoute = require("./routes/admin/tech");
const projectRoute = require("./routes/admin/project");
const skillRoute = require("./routes/admin/skill");
const cookieParser = require("cookie-parser");
const seedData = require("./config/seed");

//
connectDB();

// setting the port
const port = process.env.PORT || 6001;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(upload.none());
// bypassing the cors policy for client
app.use(
  cors({
    origin: clientDomain,
    credentials: true,
    // methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS",
  })
);

app.listen(port, () => {
  // seedData();
  console.log(`App running on port ${port}`);
});

app.use(express.json());
app.use(
  "/admin/images",
  express.static(path.join(__dirname, "uploads/img/tech"))
);
// app.use(express.static("uploads"));
app.use("/admin", loginRoute);
app.use("/admin/data", dataRoute);
app.use("/admin/data/tech", techRoute);
app.use("/admin/data/project", projectRoute);
app.use("/admin/data/skill", skillRoute);
