const TechModal = require("../../modals/tech");
const fs = require("fs");
const path = require("path");
const deleteTech = async (req, res) => {
  const id = req.params.id;
  try {
    const imgData = await TechModal.findById(id);
    const { techImgName } = imgData;
    console.log(techImgName);
    //   console.log(techImgName);
    console.log(id);
    // remove the file
    fs.unlink(`./uploads/img/tech/${techImgName}`, async (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      } else {
        console.log(`File  has been successfully removed.`);
        const removeTech = await TechModal.findByIdAndDelete(id);
        const allTechData = await TechModal.find();

        if (removeTech) {
          res.json({
            status: true,
            message: "Successfully deleted",
            data: allTechData,
          });
        }
      }
    });
  } catch (err) {
    console.log("failed to delete tech", err.message);
  }
};
module.exports = deleteTech;
