const Joi = require("joi");

const newBlog = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: {
            fullName: Joi.string().required(),
            email: Joi.string().required().email(),
        },
        image: Joi.string().required(),
        content: Joi.string().required(),
    }),
};

const updateBlog = {
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            image: Joi.string().required(),
        })
        .or("title", "image"),
};

module.exports = { newBlog, updateBlog };