const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/:id", (req, res) => {
  if (typeof req.params.id !== undefined) {
    User.findById(req.params.id)
      .select("name _id followed_authors_id follower_authors_id")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/getBatch", (req, res) => {
  console.log(req.body.id);
  User.find({ id: req.body.id })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search/:name", (req, res) => {
  User.find({ name: { $regex: req.params.name, $options: "i" } })
    .select("name _id")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
