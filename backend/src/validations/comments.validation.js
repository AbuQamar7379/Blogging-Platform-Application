const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    blogId: Joi.string().required(),
    //email: Joi.string().required().email(),
    //username: Joi.string().required(),
    comment: Joi.string().required(),
  }),
};

module.exports = { add };
