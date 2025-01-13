const SkillModal = require("../../modals/skill");

const addSkill = async (req, res) => {
  // TODO limit the skill to be one just one array - remove all the data first and add the new one.
  console.log("add skill");

  console.log(req.body);
  const allModalData = await SkillModal.deleteMany({});
  console.log(allModalData);
  const skillArray = req.body;
  try {
    const newSkillModal = new SkillModal({
      skillListed: skillArray,
    });
    await newSkillModal.save();
    res.json({ success: true, message: "Your data(Skills) has been saved" });
  } catch (err) {
    res.json({ success: false, message: "Error Occured in server." });
  }
};

module.exports = addSkill;
