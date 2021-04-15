const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const User = require("./models/user");
const Blog = require("./models/blog");
const jwt = require("jsonwebtoken");
const AuthorRoute = require("./routes/author");
const BlogRoute = require("./routes/blog");
const UserRoute = require("./routes/user");
require("dotenv").config();
const path = require("path");

app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRoute);
app.use("/api/author", AuthorRoute);
app.use("/api/blog", BlogRoute);

app.get("/api/search/:q", (req, res) => {
  User.find({ name: { $regex: req.params.q, $options: "i" } })
    .select("name _id")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/api/follow_author", (req, response) => {
  console.log(req.body.author_id);
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        response.send(err);
      } else {
        User.findByIdAndUpdate(authData.userSign._id, {
          $push: {
            followed_authors_id: req.body.author_id,
          },
        })
          .then((res) => {
            User.findByIdAndUpdate(req.body.author_id, {
              $push: { follower_authors_id: authData.userSign._id },
            })
              .then((res) => {
                console.log("followed");
                response.send("ok");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            response.send("failed");
          });
      }
    }
  );
});

app.post("/api/unfollow_author", (req, response) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
      if (err) {
        response.send(err);
      } else {
        User.findByIdAndUpdate(authData.userSign._id, {
          $pull: {
            followed_authors_id: req.body.author_id,
          },
        })
          .then((res) => {
            User.findByIdAndUpdate(req.body.author_id, {
              $pull: { follower_authors_id: authData.userSign._id },
            })
              .then((res) => {
                console.log("followed");
                response.send("ok");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            response.send("failed");
          });
      }
    }
  );
});

app.get("/api/following", (req, res) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SEC_KEY,
    (err, authData) => {
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
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

connectDatabase();

app.listen(process.env.PORT || 4000, () =>
  console.log("Listening on port 4000")
);
