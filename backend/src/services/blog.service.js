const { Blog } = require("../models");

const createBlog = async (blogData) => {
  try {
    let isBlogExist = await Blog.findOne({ title: blogData.title });
    if (isBlogExist) {
      throw new Error("Blog already exist!");
    }
    let result = await Blog.create(blogData);
    return result;
  } catch (err) {
    throw err;
  }
};

const getBlogs = async () => {
  try {
    let blogs = await Blog.find({});
    return blogs;
  } catch (err) {
    throw err;
  }
};

const updateBlog = async ({ blogId, title, image }) => {
  try {
    let blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title, image },
      { new: true }
    );
    if (!blog) {
      throw new Error("Blog doesn't found by given id");
    }
    return blog;
  } catch (err) {
    throw err;
  }
};

const deleteBlog = async (blogId) => {
  try {
    let blog = await Blog.findOneAndDelete({ _id: blogId });
    if (!blog) {
      throw new Error("Blog doesn't found by given id");
    }
    return blog;
  } catch (err) {
    throw err;
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
