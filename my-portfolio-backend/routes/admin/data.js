const express = require("express");
const addMenu = require("../../controllers/addMenu");
const checkToken = require("../../middleware/checkToken");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// posting the menu data
router.post("/menu", checkToken, addMenu);

module.exports = router;
