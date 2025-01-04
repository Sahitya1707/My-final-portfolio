const fs = require("fs");
const TechModal = require("../../modals/tech");
const addTech = async (req, res, next) => {
  console.log("add tech called");
  const { filename, mimetype } = req.file;

  console.log(filename);
  const { Name } = req.body;

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
  const techImgExist = await TechModal.findOne({
    techImgName: filename.toLowerCase(),
  });
  //   const techNameExist = await TechModal.findOne({
  //     techName: Name.toLowerCase(),
  //   });

  if (techImgExist) {
    return res.json({ status: false, message: "Was already available in db." });
  }
  const newTech = new TechModal({
    techImgName: filename.toLowerCase(),
  });

  try {
    await newTech.save();
    const allTech = await TechModal.find();
    return res
      .status(200)
      .json({ status: true, message: "Successfully added", data: allTech });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: `Error while adding Tech Image: ${err.message}`,
    });
  }
};

module.exports = addTech;
