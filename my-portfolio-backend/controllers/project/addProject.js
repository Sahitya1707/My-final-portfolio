const ProjectData = require("../../modals/project");
const getTechName = require("../../controllers/getTechName");
const addProject = async (req, res) => {
  console.log("add project called");
  const { heading, projectLink, liveLink, description, techUsed, order } =
    req.body;
  const exisitingProjectOrder = await ProjectData.findOne({ order });

  if (exisitingProjectOrder) {
    console.log(">>>>>>>>>>>>>>>>>>>");
    return res.json({
      message: "Please choose a different order. Order ID Exists.",
      status: false,
    });
  }
  const techName = await getTechName(techUsed);

  const newProject = new ProjectData({
    heading,
    description,
    techUsed,
    order,
    liveLink,
    projectLink,
    techName: techName,
  });

  await newProject.save();

  const allProject = await ProjectData.find();

  return res.json({
    message: "Project Has been added",
    success: true,
    data: allProject,
  });
};

module.exports = addProject;
