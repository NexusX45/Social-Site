const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const User = require("./models/user");
const Blog = require("./models/blog");
const jwt = require("jsonwebtoken");

app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", (req, res) => {
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
          jwt.sign({ user }, "secretkey", (err, token) => {
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

app.post("/signin", (req, res) => {
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
        jwt.sign({ userSign }, "secretkey", (err, token) => {
          res.json({ token });
        });
      } else res.json("Invalid");
    } else {
      res.json("Invalid");
    }
  });
});

app.get("/profile", (req, res) => {
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
    if (err) {
      res.send(err);
    } else {
      res.send(authData);
    }
  });
});

app.get("/user", (req, res) => {
  if (typeof req.query.id !== undefined) {
    User.findById(req.query.id)
      .then((user) => {
        res.json(user.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/write", (req, res) => {
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
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
  });
});

app.get("/feed", (req, res) => {
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
    if (err) {
      res.send(err);
    } else {
      User.findById(authData.userSign._id)
        .then((result) => {
          console.log(result.followed_authors_id);
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

      // Blog.find({ author_id: authData.user._id })
      //   .then((blog) => {
      //     res.json(blog);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  });
});

app.get("/blog", (req, res) => {
  Blog.findById(req.query.id)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/search", (req, res) => {
  User.find({ name: { $regex: req.query.name, $options: "i" } })
    .select("name _id")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/follow_author", (req, response) => {
  console.log(req.body.author_id);
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
    if (err) {
      response.send(err);
    } else {
      User.findByIdAndUpdate(authData.userSign._id, {
        $push: {
          followed_authors_id: req.body.author_id,
        },
      })
        .then((res) => {
          console.log("followed");
          response.send("ok");
        })
        .catch((err) => {
          console.log(err);
          response.send("failed");
        });
    }
  });
});

app.post("/unfollow_author", (req, response) => {
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
    if (err) {
      response.send(err);
    } else {
      User.findByIdAndUpdate(authData.userSign._id, {
        $pull: {
          followed_authors_id: req.body.author_id,
        },
      })
        .then((res) => {
          console.log("unfollowed");
          response.send("ok");
        })
        .catch((err) => {
          console.log(err);
          response.send("failed");
        });
    }
  });
});

app.get("/following", (req, res) => {
  jwt.verify(req.headers["authorization"], "secretkey", (err, authData) => {
    if (err) {
      response.send(err);
    } else {
      User.findById(authData.userSign._id)
        .then((result) => {
          res.json(result.followed_authors_id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

connectDatabase();

app.listen(4000, () => console.log("Listening on port 4000"));
