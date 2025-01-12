const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/checkToken");
const addSkill = require("../../controllers/skills/addSkills");
// --------------
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/add", checkToken, addSkill);

module.exports = router;
