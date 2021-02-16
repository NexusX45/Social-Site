const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
