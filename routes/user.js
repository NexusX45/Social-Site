const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/profile", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        res.send(authData);
      }
    }
  );
});

router.post("/write", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        const newBlog = new Blog({
          title: req.body.title,
          body: req.body.body,
          picture: req.body.picture,
          author_id: authData.userSign._id,
        });
        newBlog
          .save()
          .then(() => {
            res.json("Blog Added");
          })
          .catch(() => {
            res.json("Failed");
          });
      }
    }
  );
});

router.get("/feed", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        User.findById(authData.userSign._id)
          .then((result) => {
            Blog.find({ author_id: result.followed_authors_id })
              .then((blog) => {
                res.json(blog);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
});

router.post("/signup", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const newUser = new User({ name: name, email: email, password: password });

  newUser
    .save()
    .then(() => {
      console.log("User saved");
      User.findOne({ email: email }).then((user) => {
        if (user) {
          jwt.sign({ user }, process.env.SEC_KEY, (err, token) => {
            res.json({ token });
          });
        } else {
          res.json("Invalid");
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (password == user.password) {
        const userSign = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
        jwt.sign({ userSign }, process.env.SEC_KEY, (err, token) => {
          res.json({ token });
        });
      } else res.json("Invalid");
    } else {
      res.json("Invalid");
    }
  });
});

module.exports = router;
