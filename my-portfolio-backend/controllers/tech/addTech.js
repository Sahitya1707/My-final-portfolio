const fs = require("fs");
const TechModal = require("../../modals/tech");
const addTech = async (req, res, next) => {
  const { filename, mimetype } = req.file;

  //   if (mimetype !== "image/svg+xml") {
  //     res.json({
  //       status: false,
  //       message: "Error: Uploaded format not accepted.",
  //     });
  //   } else if (fs.existsSync(path.join("uploads/img/tech", file.filename))) {
  //     res.json({ status: false, message: "File already exist." });
  //     //   //   res.json({
  //     //   //     status: false,
  //     //   //     message: `${file.originalname} already exist in db.`,
  //     //   //   });
  //   }
  const techExist = await TechModal.findOne({
    techImgName: filename.toLowerCase(),
  });
  if (techExist) {
    return res.json({ status: false, message: "Was already available in db." });
  }
  const newTech = new TechModal({
    techImgName: filename.toLowerCase(),
  });

  try {
    await newTech.save();
    return res
      .status(200)
      .json({ status: true, message: "Successfully added" });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: `Error while adding Tech Image: ${err.message}`,
    });
  }
};

module.exports = addTech;
