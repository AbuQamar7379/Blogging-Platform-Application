const { Comment, Blog } = require("../models");

const add = async (data) => {
  try {
    let comment = await Comment.create(data);
    return comment;
  } catch (err) {
    throw err;
  }
};

const get = async (blogId) => {
  try {
    let comments = await Comment.find({ blogId });
    return comments;
  } catch (err) {
    throw err;
  }
};

module.exports = { add, get };
