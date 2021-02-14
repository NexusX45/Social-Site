import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function Author(props) {
  const [followed, setFollowed] = useState(false);
  const [following, setFollowing] = useState([]);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user?id=" + props.match.params.id)
      .then((res) => {
        setAuthor(res.data);
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
    console.log(followed);
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
      <Card className="text-center my-3">
        <Card.Body>
          <div className="h3 my-3">{author}</div>
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
