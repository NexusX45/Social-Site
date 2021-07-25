const express = require("express");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const router = express.Router();

const VerifyToken = async (token) => {
  const auth = await jwt.verify(token, process.env.APP_SECRET);
  return auth;
};

router.get("/:id", (req, res) => {
  console.log(req.body.author_id);
  Blog.findById(req.params.id)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getByAuthorId/:author_id", (req, res) => {
  Blog.find({ author_id: req.params.author_id })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/comment", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        Blog.findById(req.body.id, (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            doc.comments.push({
              author_id: authData.userSign._id,
              body: req.body.body,
              author: authData.userSign.name,
            });
            doc.save();
          }
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("ok");
      }
    }
  );
});

router.post("/like", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        Blog.findByIdAndUpdate(req.body.id, {
          $push: { likes: authData.userSign._id },
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
});

router.post("/myblogs", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        console.log(authData.userSign._id);
        Blog.find({ author_id: authData.userSign._id })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
});

router.post("/unlike", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        Blog.findByIdAndUpdate(req.body.id, {
          $pull: { likes: authData.userSign._id },
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
});

router.post("/update", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        Blog.findByIdAndUpdate(req.body.id, {
          title: req.body.title,
          body: req.body.body,
          $push: { tags: req.body.tags },
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
});

router.post("/delete", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        res.send(err);
      } else {
        Blog.findByIdAndDelete(req.body.id).then((result) => {
          res.send(result);
        });
      }
    }
  );
});

module.exports = router;
