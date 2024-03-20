const express = require("express");
const router = express.Router();
const authRouter = require("./user.routes");
const blogRouter = require("./blog.routes");
const commentRouter = require("./comments.routes");

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/comment", commentRouter);

module.exports = router;
