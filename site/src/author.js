import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function Author(props) {
  const [followed, setFollowed] = useState(false);
  const [following, setFollowing] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorFollowing, setAuthorFollowing] = useState([]);
  const [authorFollower, setAuthorFollower] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/author/" + props.match.params.id)
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
      .get("http://localhost:4000/following", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setFollowing(res.data);
      });
  }, []);

  useEffect(() => {
    console.log(following.indexOf(props.match.params.id));
    if (following.indexOf(props.match.params.id) != -1) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [following]);

  useEffect(() => {
    if (author._id)
      axios
        .get("http://127.0.0.1:4000/author/" + author._id)
        .then((res) => {
          console.log(res);
          setAuthor(res.data);
          setAuthorFollowing(res.data.followed_authors_id);
          setAuthorFollower(res.data.follower_authors_id);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [followed]);

  const handleFollowAuthor = () => {
    axios
      .post(
        "http://localhost:4000/follow_author",
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
        "http://localhost:4000/unfollow_author",
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
    </div>
  );
}
