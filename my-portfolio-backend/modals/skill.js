const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    skillListed: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Skill = mongoose.model("skill", SkillSchema);
module.exports = Skill;
