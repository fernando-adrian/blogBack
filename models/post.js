const mongoose = require("mongoose");
const postType = require("../enum/postType");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentPreview: { type: String, required: true },
  author: { type: String, required: true },
  //   postType: { type: String, enum: postType, required: true },
  // dateCreated: { type: String, required: true },
  // dateUpdated
  totalLikes: { type: Number, required: true },
  //   thumbnail: { type: String, required: true },
  //   hidden: { type: Boolean, required: false },
  // creator,
});

module.exports = mongoose.model("Post", postSchema);