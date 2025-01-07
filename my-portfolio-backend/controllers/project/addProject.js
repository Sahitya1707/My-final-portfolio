const ProjectData = require("../../modals/project");
const addProject = async (req, res) => {
  console.log("add project called");
  const { heading, projectLink, liveLink, description, techUsed, order } =
    req.body;
  const exisitingProjectOrder = await ProjectData.findOne({ order });
  console.log("---------------");
  console.log(exisitingProjectOrder);
  if (exisitingProjectOrder) {
    console.log(">>>>>>>>>>>>>>>>>>>");
    return res.json({
      message: "Please choose a different order. Order ID Exists.",
      status: false,
    });
  }

  const newProject = new ProjectData({
    heading,
    description,
    techUsed,
    order,
    liveLink,
    projectLink,
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
