const ProjectModal = require("../../modals/project");
const TechModal = require("../../modals/tech");
const getProject = async (req, res) => {
  console.log("getProject.js called");
  const id = req.params.id;
  // this array will contain the image name
  const techImg = [];

  //making it let as we need to add the item at the end after img is found
  let projectData = await ProjectModal.findOne({ _id: id });

  for (const id of projectData.techUsed) {
    const result = await TechModal.findOne({ _id: id });
    console.log(result);
    if (result.techImgName) {
      techImg.push(result.techImgName);
    }
  }

  projectData = {
    ...projectData.toObject(), // Convert Mongoose document to plain JS object. I am converting it just to add the img
    techImgName: techImg, // Add new property.
  };
  if (projectData) {
    res.json({
      success: true,
      data: projectData,
      message: "Single Project Data has been found.",
    });
  } else {
    res.json({ success: false, message: "Didnot found any id" });
  }
  console.log(id);
};

module.exports = getProject;
