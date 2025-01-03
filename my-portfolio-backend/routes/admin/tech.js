const express = require("express");
const checkToken = require("../../middleware/checkToken");
const addTech = require("../../controllers/tech/addTech");
const deleteTech = require("../../controllers/tech/deleteTech");
const getAllTech = require("../../controllers/tech/getAllTech");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/img/tech");
  },
  filename: function (req, file, cb) {
    // if (file.mimetype !== "image/svg+xml") {
    //   console.log("not a svg");
    //   //   return res.json({
    //   //     status: false,
    //   //     message: "Try to upload svg file.",
    //   //   });
    // } else if (
    //   fs.existsSync(path.join("uploads/img/tech", file.originalname))
    // ) {
    //   cb("Error: File already exist.");
    //   //   res.json({
    //   //     status: false,
    //   //     message: `${file.originalname} already exist in db.`,
    //   //   });
    // } else {
    cb(null, file.originalname);
    // }
  },
});
const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/img/tech" });
// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// in order for you to get the multipart data user multer
router.post(
  "/add",
  checkToken,

  upload.single("Image"),
  addTech
);
router.delete("/delete/:id", checkToken, deleteTech);
router.get("/getAllTech", checkToken, getAllTech);
module.exports = router;
