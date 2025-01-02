const express = require("express");
const router = express.Router();

const { checkLogin } = require("../../controllers/checkLogin");
const authUser = require("../../controllers/authUser");
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
//
router.use(express.urlencoded({ extended: false }));
// router.use(express.json());]
//post the data
// router.post("/register", loginUser);
router.post("/login", checkLogin);
// verify if there is cookie or not
router.get("/verify", authUser);

module.exports = router;
