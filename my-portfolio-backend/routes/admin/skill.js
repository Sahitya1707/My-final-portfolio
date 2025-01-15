const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addSkill = require("../../controllers/skills/addSkills");
const router = express.Router();
const getSkills = require("../../controllers/skills/getSkills");
// --------------
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/add", checkToken, addSkill);
router.get("/getAll", getSkills);

module.exports = router;
