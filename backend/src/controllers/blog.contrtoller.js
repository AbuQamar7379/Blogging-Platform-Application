const httpStatus = require("http-status");
const { blogService } = require("../services");

const newBlog = async (req, res) => {
  try {
    let blog = await blogService.createBlog(req.body);
    return res.status(httpStatus.CREATED).send(blog);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await blogService.getBlogs();
    return res.status(httpStatus.OK).send(blogs);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    let { title, image } = req.body;
    let { blogId } = req.params;
    let blog = await blogService.updateBlog({ blogId, title, image });
    return res
      .status(httpStatus.NO_CONTENT)
      .send({ blog, message: "Blog updated successfully" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    let blog = await blogService.deleteBlog(req.params.blogId);
    return res
      .status(httpStatus.NO_CONTENT)
      .send({ blog, message: "Blog Deleted Successfully" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

module.exports = { newBlog, getAllBlogs, updateBlog, deleteBlog };
