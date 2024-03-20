const Jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, secretKey = config.secretKey) => {
  let payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    expires,
  };

  let token = Jwt.sign(payload, secretKey);
  return token;
};

const generateAuthToken = async (user) => {
  let tokenExpires = Math.floor(Date.now() / 1000) + 300 * 60;
  let token = generateToken(user._id.toString(), tokenExpires);
  return {
    token,
    expires: new Date(tokenExpires * 1000).toLocaleString(),
  };
};

module.exports = { generateAuthToken };
