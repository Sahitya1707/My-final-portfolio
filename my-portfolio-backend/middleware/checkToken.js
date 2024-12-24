const AdminData = require("../modals/adminLogin");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  console.log("check token called");
  console.log("------------------");
  const { refreshToken, accessToken } = req.cookies;

  if (!refreshToken && !accessToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const decodeAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SIGNATURE
    );
    if (decodeAccessToken) {
      next();
    }
  } catch (err) {
    try {
      const decodeRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SIGNATURE
      );
      console.log("refresh token decode");
      console.log(decodeRefreshToken);
      if (decodeRefreshToken) {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = checkToken;
