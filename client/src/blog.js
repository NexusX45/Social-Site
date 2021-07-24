import React, { createRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { getBlogById, getFollowing, getAuthor } from "./services/service";
import "./css/blog.scss";

export default function Blog({ id }) {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorFollowing, setAuthorFollowing] = useState([]);
  const [authorFollower, setAuthorFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user);
  const comment = createRef();
  const history = useHistory();

  //Initial Request....
  useEffect(() => {
    getBlogById(id)
      .then((blog) => {
        setData(blog);
        setComments(blog.comments);
        setLikes(blog.likes);
      })
      .catch((err) => {
        console.log(err);
      });
    getFollowing().then((res) => {
      setFollowing(res);
    });
  }, [id]);

  useEffect(() => {
    if (likes.indexOf(user.user_data._id) !== -1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  useEffect(() => {
    console.log(data.author_id);
    if (data.author_id)
      getAuthor(data.author_id)
        .then((author) => {
          setAuthor(author);
          setAuthorFollowing(author.followed_authors_id);
          setAuthorFollower(author.follower_authors_id);
        })
        .catch((err) => {
          console.log(err);
        });
    if (following.indexOf(data.author_id) !== -1) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [data, following]);

  useEffect(() => {
    getBlogById(id)
      .then((blog) => {
        setLikes(blog.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [liked, id]);

  useEffect(() => {
    if (data.author_id)
      getAuthor(data.author_id)
        .then((author) => {
          setAuthor(author);
          setAuthorFollowing(author.followed_authors_id);
          setAuthorFollower(author.follower_authors_id);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [followed, data]);

  const handleFollowAuthor = () => {
    axios
      .post(
        "/api/follow_author",
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
        "/api/unfollow_author",
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
    if (comment.current.value !== "") {
      axios
        .post(
          "/api/blog/comment",
          {
            id: id,
            author_id: author._id,
            body: comment.current.value,
            author: author.name,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          axios
            .get("/api/blog/" + id)
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
          "/api/blog/unlike",
          {
            id: id,
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
          "/api/blog/like",
          {
            id: id,
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

  const handleUpdate = () => {
    history.push("/update/" + id);
  };

  return (
    <div className="container">
      <div className="py-3 d-flex flex-wrap">
        <Card className="blog-card">
          <Card.Body>
            <Card.Title>
              <div className="d-flex">
                {user.user_data._id === data.author_id ? (
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-9">
                      <div className="h2">{data.title}</div>
                    </div>
                    <div className="col">
                      <Button variant="outline-danger" onClick={handleUpdate}>
                        Edit Blog
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h2">{data.title}</div>
                )}
              </div>
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
                {/* <Button variant="outline-success" className="mx-2">
                  Save
                </Button>
                <Button variant="outline-secondary">Share</Button> */}
              </div>
            </Card.Text>
            <div className="mt-5">
              <div className="my-2">Comments</div>
              <input id="comment-input" ref={comment}></input>
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
        <Card className="mx-auto author-info-card" style={{ height: "300px" }}>
          <Card.Body style={{ padding: "10px" }}>
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
                  <div className="col-5" style={{ padding: "0px" }}>
                    <div className="h5 text-center">Follower</div>
                    <div className="h5 text-center">
                      {authorFollower.length}
                    </div>
                  </div>
                </div>
              </div>
              {user.user_data._id === data.author_id ? (
                <Button
                  onClick={() => history.push("/profile")}
                  variant="outline-success"
                  style={{ width: "100%" }}
                >
                  Profile
                </Button>
              ) : followed ? (
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
    </div>
  );
}
