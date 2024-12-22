const sendCookie = (expiryTime, token, tokenName, res) => {
  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + expiryTime),
  });
};
module.exports = sendCookie;
