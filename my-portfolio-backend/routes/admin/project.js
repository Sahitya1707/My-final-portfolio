const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addProject = require("../../controllers/project/addProject");
const router = express.Router();
// --------------
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/add", checkToken, addProject);

module.exports = router;
