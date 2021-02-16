const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: "string",
    required: "Please enter a name",
    trim: true,
    maxlength: 100,
  },
  email: { type: "string", required: "Please enter email", trim: true },
  password: { type: "string", required: "Please enter password", trim: false },
  followed_authors_id: [String],
  follower_authors_id: [String],
});

module.exports = mongoose.model("User", userSchema);
