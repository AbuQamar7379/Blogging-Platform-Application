const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        maxLength: 30,
        validate: (email) => validator.isEmail(email),
    },
}, { _id: false });

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: authorSchema,
    image: {
        type: String,
        required: true,
        validate: (url) => validator.isURL(url),
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };