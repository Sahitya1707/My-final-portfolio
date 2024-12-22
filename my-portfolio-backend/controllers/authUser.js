const jwt = require("jsonwebtoken");
const sendCookie = require("../middleware/setCookie");
const { generateToken } = require("../middleware/generateToken");
const authUser = (req, res) => {
  const { refreshToken, accessToken } = req.cookies;

  // checking if both token are not available
  if (!refreshToken && !accessToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  //   if (!refreshToken) {
  //     return res.status(401).send("Access Denied. No refresh token provided.");
  //   }
  try {
    const decodeAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SIGNATURE
    );

    // extracting email from accessToken
    const { email } = decodeAccessToken;
    res.json({
      message: "admin verified",
      email: email,
      condition: "Access Token refreshed",
    });
  } catch (err) {
    if (!accessToken) {
      console.log("No access token found");
    }
    try {
      console.log("decoding refresh token");
      const decodeRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SIGNATURE
      );
      const { email } = decodeRefreshToken;
      const accessToken = generateToken(
        email,
        process.env.ACCESS_TOKEN_SIGNATURE,
        "15m"
      );
      const accessTokenExpiry = 60 * 15 * 1000;
      sendCookie(accessTokenExpiry, accessToken, "accessToken", res);
      res.json({
        message: "admin verified",
        email: email,
        condition: "Access Token refreshed",
      });
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = authUser;
