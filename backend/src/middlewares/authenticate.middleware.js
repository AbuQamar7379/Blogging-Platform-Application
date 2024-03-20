const Jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");
const httpStatus = require("http-status");

const auth = (req, res, next) => {
  let { authorization } = req.headers;

  let token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Unauthorized access!" });
  }

  Jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).send({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

module.exports = { auth };
