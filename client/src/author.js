import React from "react";
import axios from "axios";
import BlogTiles from "./components/blogtiles";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function Author(props) {
  const [followed, setFollowed] = useState(false);
  const [following, setFollowing] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorFollowing, setAuthorFollowing] = useState([]);
  const [authorFollower, setAuthorFollower] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/author/" + props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setAuthor(res.data);
        setAuthorFollowing(res.data.followed_authors_id);
        setAuthorFollower(res.data.follower_authors_id);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/following/", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setFollowing(res.data);
      });
    axios
      .get(`/api/blog/getByAuthorId/${props.match.params.id}`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  useEffect(() => {
    console.log(following.indexOf(props.match.params.id));
    if (following.indexOf(props.match.params.id) !== -1) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [following, props]);

  useEffect(() => {
    if (author._id)
      axios
        .get("/api/author/" + author._id)
        .then((res) => {
          console.log(res);
          setAuthor(res.data);
          setAuthorFollowing(res.data.followed_authors_id);
          setAuthorFollower(res.data.follower_authors_id);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleFollowAuthor = () => {
    axios
      .post(
        "/api/follow_author/",
        {
          author_id: props.match.params.id,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        setFollowed(true);
        console.log(res);
      });
  };

  const handleUnfollowAuthor = () => {
    axios
      .post(
        "/api/unfollow_author/",
        {
          author_id: props.match.params.id,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        setFollowed(false);
        console.log(res);
      });
  };
  return (
    <div className="container">
      <Card className="text-center my-3 mx-auto" style={{ width: "30em" }}>
        <Card.Body>
          <div className="h3 my-3">{author.name}</div>
          <div className="d-flex mb-3">
            <div className="row" style={{ width: "100%" }}>
              <div className="col-7">
                <div className="h5 text-center">Following</div>
                <div className="h5 text-center">{authorFollowing.length}</div>
              </div>
              <div className="col-5">
                <div className="h5 text-center">Follower</div>
                <div className="h5 text-center">{authorFollower.length}</div>
              </div>
            </div>
          </div>
          {followed ? (
            <Button variant="outline-success" onClick={handleUnfollowAuthor}>
              Unfollow
            </Button>
          ) : (
            <Button variant="outline-success" onClick={handleFollowAuthor}>
              Follow
            </Button>
          )}
        </Card.Body>
      </Card>
      <div className="h4">Blogs</div>

      {blogs.map((item) => (
        <BlogTiles title={item.title} body={item.body} id={item._id} />
      ))}
    </div>
  );
}
