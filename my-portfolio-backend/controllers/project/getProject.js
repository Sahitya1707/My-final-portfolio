const ProjectModal = require("../../modals/menu");

const getProject = (req, res) => {
  console.log("getProject.js called");
  const id = req.params.id;
  console.log(id);
};

module.exports = getProject;
