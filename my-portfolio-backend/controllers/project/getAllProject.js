const ProjectModal = require("../../modals/project");

const getAllProject = async (req, res) => {
  console.log("getAllproject.js");
  try {
    const allProject = await ProjectModal.find();
    console.log(allProject);
    if (allProject) {
      res.json({
        status: true,
        data: allProject,
      });
    }
  } catch (err) {
    console.log("Error in getAllProject.js", err.message);
  }
};

module.exports = getAllProject;
