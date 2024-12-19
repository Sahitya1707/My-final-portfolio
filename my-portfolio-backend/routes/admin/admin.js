const express = require("express");
const router = express.Router();

const { getLogin } = require("../../controllers/getLogin");
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
//
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/login", getLogin);

module.exports = router;
