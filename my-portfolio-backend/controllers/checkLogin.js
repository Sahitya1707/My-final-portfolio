const { generateToken } = require("../middleware/generateToken");
const sendCookie = require("../middleware/setCookie");
const AdminData = require("../modals/adminLogin");
const bcrypt = require("bcryptjs");

const checkLogin = async (req, res) => {
  const { email, password } = req.body;

  AdminData.findOne({ email: req.body.email }).then((loginData) => {
    if (loginData) {
      const hashedPassword = loginData.password;

      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          console.log("Error", err);
        }
        console.log(result);
        if (result) {
          console.log("inside the result");
          const accessToken = generateToken(
            email,
            process.env.ACCESS_TOKEN_SIGNATURE,
            "15m"
          );

          // generting refresh token
          const refreshToken = generateToken(
            email,
            process.env.REFRESH_TOKEN_SIGNATURE,
            "20d"
          );

          // sending the token to frontend
          const refreshTokenExpiry = 60 * 60 * 24 * 20;
          const accessTokenExpiry = 60 * 15 * 1000;
          sendCookie(refreshTokenExpiry, refreshToken, "refreshToken", res);
          sendCookie(accessTokenExpiry, accessToken, "accessToken", res);
          // sending message authentication done
          res.json({
            success: true,
            message: "Authentication successfull",
          });
        } else {
          res.status(401).send({ message: "Invalid Credentials" });
        }
      });
    } else {
      console.log("No data found");
    }
  });
  // console.log();

  //logic here
};

module.exports = {
  checkLogin,
};
