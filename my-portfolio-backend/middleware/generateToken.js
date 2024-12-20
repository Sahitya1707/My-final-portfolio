const jwt = require("jsonwebtoken");

const generateToken = (email, signature, expiryTime) => {
  const token = jwt.sign({ email: email }, signature, {
    expiresIn: expiryTime,
    algorithm: "HS256",
    issuer: "Sahitya Neupane",
  });
  return token;
};

const generateRefreshToken = (email) => {};

module.exports = { generateToken };
