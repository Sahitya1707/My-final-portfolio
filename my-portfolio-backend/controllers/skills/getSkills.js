const SkillModal = require("../../modals/skill");

const getSkills = async (req, res) => {
  console.log("getskills.js");
  try {
    const allSkills = await SkillModal.find();
    if (allSkills) {
      res.json({
        data: allSkills,
        status: true,
      });
    }
  } catch (err) {
    console.log("Error in getSkill.js", err.message);
  }
};
module.exports = getSkills;
