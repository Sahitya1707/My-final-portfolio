const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    skillListed: {
      name: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Skill = mongoose.model("skill", SkillSchema);
module.exports = Skill;
