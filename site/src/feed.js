import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Feed() {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();

  const handleBlog = (props) => {
    history.push("/blog/" + props);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/user/feed", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlogs(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const BlogTiles = (props) => {
    return (
      <Card
        className="my-2 text-card"
        onClick={() => {
          handleBlog(props.id);
        }}
      >
        <Card.Body className="d-flex my-2">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
            width="360px"
            height="240px"
            className="mx-2"
          />
          <div className="mx-3">
            <div class="h3 mb-3">{props.title}</div>
            <div class="lead" style={{ width: "100%" }}>
              <span>{props.body.slice(0, 400) + "..."}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div class="container my-2">
        <div className="my-3">
          <span class="h2 ">Feed</span>
        </div>
        {blogs.map((blog) => (
          <BlogTiles title={blog.title} body={blog.body} id={blog._id} />
        ))}
      </div>
    </div>
  );
}
