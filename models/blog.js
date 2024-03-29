const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: "string",
    required: true,
    trim: false,
    maxlength: 100,
  },
  body: {
    type: "string",
    required: true,
    trim: false,
    maxlength: 5000,
  },
  picture: {
    type: "string",
    required: false,
    trim: true,
  },
  author_id: {
    type: "string",
    required: true,
  },
  comments: {
    type: [{ author_id: String, body: String, author: String }],
  },
  likes: [String],
  tags: [String],
});

module.exports = mongoose.model("Blog", blogSchema);
