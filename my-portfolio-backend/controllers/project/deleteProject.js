const ProjectModal = require("../../modals/project");

const deleteProject = async (req, res) => {
  console.log("delete project has been called");
  const id = req.params.id;
  console.log(id);
  try {
    const removeProject = await ProjectModal.findByIdAndDelete(id);
    const allProject = await ProjectModal.find();

    if (removeProject) {
      res.json({
        status: true,
        message: "Project has been deleted.",
        data: allProject,
      });
      return;
    } else {
      res.json({
        status: false,
        message: "Failed to delete the project.",
      });
      return;
    }
  } catch (err) {
    console.log("failed to delete project", err.message);
  }
};

module.exports = deleteProject;
