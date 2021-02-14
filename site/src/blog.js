import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export default function Blog(props) {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState("");
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .get("http://127.0.0.1:4000/blog?id=" + props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/following", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setFollowing(res.data);
      });
  }, []);

  useEffect(() => {
    console.log(data.author_id);
    if (data.author_id)
      axios
        .get("http://127.0.0.1:4000/user?id=" + data.author_id)
        .then((res) => {
          console.log(res);
          setAuthor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    if (following.indexOf(data.author_id) != -1) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [data, following]);

  const handleFollowAuthor = () => {
    axios
      .post(
        "http://localhost:4000/follow_author",
        {
          author_id: data.author_id,
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
          author_id: data.author_id,
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
      <div className="py-3 d-flex">
        <Card style={{ width: "70%" }}>
          <Card.Body>
            <Card.Title>
              <div className="h2">{data.title}</div>
            </Card.Title>
            <Card.Subtitle>
              <a
                href={"/author/" + data.author_id}
                style={{ textDecoration: "none", color: "black" }}
              >
                {author}
              </a>
            </Card.Subtitle>
            <Card.Text>
              <div className="mt-4 lead">{data.body}</div>
            </Card.Text>
            <div className="mt-5">
              <div className="my-2">Comments</div>
              <input style={{ width: "70%" }}></input>
              <Button className="mx-2" variant="outline-primary">
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card className="mx-3" style={{ width: "30%", height: "300px" }}>
          <Card.Body>
            <Card.Title>{author}</Card.Title>
            <Card.Text>
              {followed ? (
                <Button
                  variant="outline-success"
                  style={{ width: "100%" }}
                  onClick={handleUnfollowAuthor}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  style={{ width: "100%" }}
                  onClick={handleFollowAuthor}
                >
                  Follow
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      {/* <div className="h3 my-3">{data.title}</div> */}
      {/* <div className="h6">{author}</div> */}
      {/* <div className="lead my-3">{data.body}</div> */}
    </div>
  );
}
