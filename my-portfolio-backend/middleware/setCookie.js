const sendCookie = (expiryTime, token, tokenName, res) => {
  console.log(expiryTime);
  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: "",

    sameSite: "None",
    expires: new Date(Date.now() + expiryTime),
  });
};
module.exports = sendCookie;
