const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  postCollection: { type: String, required: true },
  content: { type: String, required: true },
  contentPreview: { type: String, required: true },
  author: { type: String, required: true },
  createDate: { type: Date, required: true },
  // dateUpdated
  totalLikes: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  //   hidden: { type: Boolean, required: false },
  // creator,
});

module.exports = mongoose.model("Post", postSchema);
