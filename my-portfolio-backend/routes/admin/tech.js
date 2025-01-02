const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addTech = require("../../controllers/tech/addTech");
const deleteTech = require("../../controllers/tech/deleteTech");
const getAllTech = require("../../controllers/tech/getAllTech");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/add", checkToken, addTech);
router.delete("/delete/:id", checkToken, deleteTech);
router.get("/getAllTech", checkToken, getAllTech);
module.exports = router;
