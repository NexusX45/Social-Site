import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./css/feed.scss";
import { getFeed } from "./services/service";

export default function Feed() {
  const [blogs, setBlogs] = useState([{ title: "", body: "", _id: "" }]);
  const history = useHistory();

  const handleBlog = (props: any) => {
    history.push("/blog/" + props);
  };

  useEffect(() => {
    getFeed().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  const BlogTiles = (props: any) => {
    return (
      <Card
        className="my-2 text-card"
        onClick={() => {
          handleBlog(props.id);
        }}
      >
        <Card.Body className="d-flex my-2">
          <div className="mx-3">
            <div className="h3 mb-3">{props.title}</div>
            <div className="lead" style={{ width: "100%" }}>
              <ReactMarkdown>{props.body.slice(0, 400) + "..."}</ReactMarkdown>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div className="container my-2">
        <div className="d-flex my-3">
          <div className="tag-section" style={{ width: "200px" }}>
            <div className="h4 mb-3">Tags</div>
            <div className="tag-list">
              <div className="tag">#Coming Soon</div>
              {/* <div className="tag">#bruh</div>
              <div className="tag">#bruh</div>
              <div className="tag">#bruh</div> */}
            </div>
          </div>
          <div className="ml-3" style={{ width: "70%" }}>
            <span className="h4">Feed</span>
            {blogs.map((blog) => (
              <BlogTiles title={blog.title} body={blog.body} id={blog._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
