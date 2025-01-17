const TechModal = require("../modals/tech");

const getTechName = async (techId) => {
  console.log("get tech name .js");
  let techName = [];
  console.log(techId);
  for (const id of techId) {
    const result = await TechModal.findOne({ _id: id });

    if (id) {
      techName.push(result.techImgName);
    }
  }
  return techName;
};
module.exports = getTechName;
