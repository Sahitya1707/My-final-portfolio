const ProjectModal = require("../../modals/project");
// TODO: find the existing project order, I mean filter with yourself if there is anyother project number with the number you are trying to change then it should throw wrror and if you not changing the product number then it shouldnout (not priority)
const editProject = async (req, res) => {
  console.log("editProject.js");
  console.log(req.body);
  const id = req.params.id;

  const { heading, projectLink, liveLink, order, description, techUsed } =
    req.body;
  console.log(heading, projectLink, liveLink, order, description, techUsed);

  try {
    const exisitngOrderNumber = await ProjectModal.findOne({
      order: req.body.order,
    });
    // if (exisitngOrderNumber) {
    //   return res.json({
    //     success: false,
    //     message: "Order number you are trying to submit is already there.",
    //   });
    // }
    await ProjectModal.findByIdAndUpdate(id, {
      heading,
      projectLink,
      liveLink,
      order,
      description,
      techUsed,
    });
    const allProject = await ProjectModal.find();
    res.json({ status: true, message: "Project Updated", data: allProject });
  } catch (err) {
    console.log(err.message);
    res.send(400).send("Server Error");
  }
};

module.exports = editProject;
