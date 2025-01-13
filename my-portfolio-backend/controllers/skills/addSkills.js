const SkillModal = require("../../modals/skill");

const addSkill = async (req, res) => {
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
