const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techUsed: {
      type: [String],
      required: true,
    },
    liveLink: {
      type: String,
    },
    projectLink: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
