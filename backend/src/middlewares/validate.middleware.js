const httpStatus = require("http-status");

const validateBody = (schema) => (req, res, next) => {
  let { error } = schema.body.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }
  next();
};

module.exports = { validateBody };
