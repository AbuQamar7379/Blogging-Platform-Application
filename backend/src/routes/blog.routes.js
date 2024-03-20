const router = require("express").Router();
const { blogController } = require("../controllers");
const { auth, validate } = require("../middlewares");
const { blog } = require("../validations");

router.post(
  "/new",
  auth,
  validate.validateBody(blog.newBlog),
  blogController.newBlog
);
router.get("/getAll", blogController.getAllBlogs);
router.patch(
  "/update/:blogId",
  auth,
  validate.validateBody(blog.updateBlog),
  blogController.updateBlog
);
router.delete("/delete/:blogId", auth, blogController.deleteBlog);

module.exports = router;
