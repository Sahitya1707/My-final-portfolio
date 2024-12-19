const express = require("express");
const router = express.Router();

const { checkLogin } = require("../../controllers/checkLogin");
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
//
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// router.post("/register", loginUser);
router.post("/login", checkLogin);

module.exports = router;
