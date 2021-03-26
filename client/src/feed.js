import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function Feed() {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();

  const handleBlog = (props) => {
    history.push("/blog/" + props);
  };

  useEffect(() => {
    axios
      .get("/api/user/feed", {
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
          <div className="mx-3">
            <div class="h3 mb-3">{props.title}</div>
            <div class="lead" style={{ width: "100%" }}>
              <ReactMarkdown>{props.body.slice(0, 400) + "..."}</ReactMarkdown>
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
