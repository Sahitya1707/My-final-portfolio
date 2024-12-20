const sendCookie = (expiryTime, token, tokenName, res) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: false,
    sameSite: "None",
    expires: new Date(Date.now() + expiryTime),
  });
  console.log(`Cookie set: ${tokenName} = ${token}`);
};
module.exports = sendCookie;
