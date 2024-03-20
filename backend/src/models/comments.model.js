const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    blogId: { type: String, required: true },
    /*email: {
       type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },*/
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("comment", commentsSchema);

module.exports = { commentsModel };
