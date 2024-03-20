const express = require("express");
const router = express.Router();
const authRouter = require("./user.routes");
const blogRouter = require("./blog.routes");
const commentRouter = require("./comments.routes");

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/comment", commentRouter);
router.get("/", (req, res) =>
  res
    .status(200)
    .send("<h2>Blogging Platform Application server is runnig.......</h2>")
);

module.exports = router;
