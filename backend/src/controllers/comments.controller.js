const httpStatus = require("http-status");
const { commentService } = require("../services");

const addComment = async (req, res) => {
  try {
    let comment = await commentService.add(req.body);
    return res.status(httpStatus.CREATED).send(comment);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

const getComment = async (req, res) => {
  try {
    let comments = await commentService.get(req.params.blogId);
    return res.status(httpStatus.OK).send(comments);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

module.exports = { addComment, getComment };
