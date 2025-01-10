const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addProject = require("../../controllers/project/addProject");
const getAllProject = require("../../controllers/project/getAllProject");
const deleteProject = require("../../controllers/project/deleteProject");
const editProject = require("../../controllers/project/editProject");
const getProject = require("../../controllers/project/getProject");
const router = express.Router();
// --------------
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/add", checkToken, addProject);
router.get("/getAll", checkToken, getAllProject);
router.delete("/delete/:id", checkToken, deleteProject);
router.get("/:id", checkToken, getProject);
router.put("/edit/:id", checkToken, editProject);

module.exports = router;
