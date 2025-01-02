const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addTech = require("../../controllers/tech/addTech");
const deleteTech = require("../../controllers/tech/deleteTech");
const getAllTech = require("../../controllers/tech/getAllTech");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "uploads/img/tech" });
// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// in order for you to get the multipart data user multer
router.post("/add", checkToken, upload.single("Image"), addTech);
router.delete("/delete/:id", checkToken, deleteTech);
router.get("/getAllTech", checkToken, getAllTech);
module.exports = router;
