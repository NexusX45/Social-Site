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
  console.log(req.body);

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
        jwt.sign({ user }, "secretkey", (err, token) => {
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

app.get("/users", (req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
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
        author_id: authData.user._id,
      });
      // console.log(newBlog);
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
      Blog.find({ author_id: authData.user._id })
        .then((blog) => {
          res.json(blog);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

app.get("/blog", (req, res) => {
  console.log(req.query.id);
  Blog.findById(req.query.id)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.send(err);
    });
});

connectDatabase();

app.listen(4000, () => console.log("Listening on port 4000"));
