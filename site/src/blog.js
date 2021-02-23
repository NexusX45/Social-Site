import React, { createRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Blog(props) {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorFollowing, setAuthorFollowing] = useState([]);
  const [authorFollower, setAuthorFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const comment = createRef();
  const history = useHistory();

  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .get("http://127.0.0.1:4000/blog/" + props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setComments(res.data.comments);
        setLikes(res.data.likes);
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
    axios
      .get("http://localhost:4000/user/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        if (likes.indexOf(res.data.userSign._id) != -1) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
  }, [likes]);
  useEffect(() => {
    console.log(data.author_id);
    if (data.author_id)
      axios
        .get("http://127.0.0.1:4000/author/" + data.author_id)
        .then((res) => {
          console.log(res);
          setAuthor(res.data);
          setAuthorFollowing(res.data.followed_authors_id);
          setAuthorFollower(res.data.follower_authors_id);
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/blog/" + props.match.params.id)
      .then((res) => {
        setLikes(res.data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [liked]);

  useEffect(() => {
    if (data.author_id)
      axios
        .get("http://127.0.0.1:4000/author/" + data.author_id)
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

  const handleComment = () => {
    if (comment.current.value != "") {
      axios
        .post(
          "http://localhost:4000/blog/comment",
          {
            id: props.match.params.id,
            author_id: author._id,
            body: comment.current.value,
            author: author.name,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          axios
            .get("http://127.0.0.1:4000/blog/" + props.match.params.id)
            .then((res) => {
              setComments(res.data.comments);
              document.getElementById("comment-input").value = "";
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAuthor = (author_id) => {
    history.push("/author/" + author_id);
  };

  const handleLike = () => {
    if (liked) {
      axios
        .post(
          "http://localhost:4000/blog/unlike",
          {
            id: props.match.params.id,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          console.log(res);
          setLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "http://localhost:4000/blog/like",
          {
            id: props.match.params.id,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          console.log(res);
          setLiked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                {author.name}
              </a>
            </Card.Subtitle>
            <Card.Text>
              <div className="mt-4 lead">
                <ReactMarkdown>{data.body}</ReactMarkdown>
              </div>
              <div className="mt-5 d-flex">
                {liked ? (
                  <Button variant="outline-primary" onClick={handleLike}>
                    <div className>{likes.length} Liked</div>
                  </Button>
                ) : (
                  <Button variant="outline-primary" onClick={handleLike}>
                    <div className>{likes.length} Like</div>
                  </Button>
                )}
                <Button variant="outline-success" className="mx-2">
                  Save
                </Button>
                <Button variant="outline-secondary">Share</Button>
              </div>
            </Card.Text>
            <div className="mt-5">
              <div className="my-2">Comments</div>
              <input
                id="comment-input"
                style={{ width: "70%" }}
                ref={comment}
              ></input>
              <Button
                className="mx-2"
                variant="outline-primary"
                onClick={handleComment}
              >
                Submit
              </Button>
            </div>
            <div>
              {comments.map((item) => (
                <div className="mt-3">
                  <div
                    className="h5 text-card"
                    style={{ lineHeight: "2px" }}
                    onClick={() => {
                      handleAuthor(item.author_id);
                    }}
                  >
                    {item.author}
                  </div>
                  <div className="text-dark">{item.body}</div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Card className="mx-3" style={{ width: "30%", height: "300px" }}>
          <Card.Body>
            <Card.Title className="text-center">{author.name}</Card.Title>
            <Card.Text>
              <div className="d-flex mb-3">
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-7">
                    <div className="h5 text-center">Following</div>
                    <div className="h5 text-center">
                      {authorFollowing.length}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="h5 text-center">Follower</div>
                    <div className="h5 text-center">
                      {authorFollower.length}
                    </div>
                  </div>
                </div>
              </div>

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
