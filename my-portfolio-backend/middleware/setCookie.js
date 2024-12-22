const sendCookie = (expiryTime, token, tokenName, res) => {
  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: false,

    sameSite: "None",
    expires: new Date(Date.now() + expiryTime),
  });
};
module.exports = sendCookie;
