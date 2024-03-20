const router = require("express").Router();
const { commentController } = require("../controllers");
const { validate } = require("../middlewares");
const { comment } = require("../validations");

router.post(
  "/add",
  validate.validateBody(comment.add),
  commentController.addComment
);
router.get("/getComments/:blogId", commentController.getComment);

module.exports = router;
