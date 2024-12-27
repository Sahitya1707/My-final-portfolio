const express = require("express");
const addMenu = require("../../controllers/addMenu");
const checkToken = require("../../middleware/checkToken");
const getMenu = require("../../controllers/getMenu");
const deleteMenu = require("../../controllers/deleteMenu");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// posting the menu data
router.post("/menu", checkToken, addMenu);
router.get("/getAllMenu", getMenu);
//delete the data
router.delete("/menu/delete/:id", checkToken, deleteMenu);

module.exports = router;
