import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogTiles = (props) => {
  const history = useHistory();
  const handleBlog = (props) => {
    history.push("/blog/" + props);
  };
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

export default BlogTiles;
