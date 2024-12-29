const express = require("express");
const addMenu = require("../../controllers/menu/addMenu");
const checkToken = require("../../middleware/checkToken");
const getMenu = require("../../controllers/menu/getMenu");
const deleteMenu = require("../../controllers/menu/deleteMenu");
const editMenu = require("../../controllers/menu/editMenu");
const getSingleMenu = require("../../controllers/menu/getSingleMenu");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// posting the menu data
router.post("/menu", checkToken, addMenu);
router.get("/getAllMenu", checkToken, getMenu);
//delete the data
router.delete("/menu/delete/:id", checkToken, deleteMenu);
//edit the data
router.put("/menu/edit/:id", checkToken, editMenu);
//get the data
router.get("/get/menu/:id", checkToken, getSingleMenu);

module.exports = router;
