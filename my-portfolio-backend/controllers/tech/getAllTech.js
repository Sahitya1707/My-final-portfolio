const TechData = require("../../modals/tech");
const getAllTech = async (req, res, next) => {
  console.log("response");
  try {
    const data = await TechData.find();
    res.json({
      data: data,
      success: true,
      message: "Tech data.",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = getAllTech;
