import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Write() {
  const title = React.createRef();
  const body = React.createRef();
  const picture =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";

  const history = useHistory();

  const publish = () => {
    axios.post(
      "/api/user/write",
      {
        title: title.current.value,
        body: body.current.value,
        picture: picture,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    history.push("/");
  };

  return (
    <div className="container">
      <div class="h4 mt-3 mb-3">Write a blog</div>
      <Card className="blog-card">
        <Card.Body>
          <div className="my-3 d-flex">
            <input
              className="mx-3 h3"
              style={{
                width: "80%",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                outline: "none",
                borderBottom: "solid 1px",
                borderColor: "rgba(158, 158, 158, .6)",
              }}
              placeholder="Title"
              ref={title}
            ></input>
          </div>
          <div className="my-3 d-flex">
            <textarea
              className="mx-3 lead"
              style={{
                width: "100%",
                height: "500px",
                border: "none",
                outline: "none",
                resize: "none",
              }}
              ref={body}
              placeholder="Write your content here... (Markdown is supported)"
            ></textarea>
          </div>
          <div>
            <input
              placeholder="Mention tags"
              style={{
                width: "80%",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                outline: "none",
                borderBottom: "solid 1px",
                borderColor: "rgba(158, 158, 158, .6)",
                marginBottom: "5%",
              }}
            ></input>
          </div>
          <div className="d-flex">
            <button
              className="btn btn-primary justify-content-flex-end"
              onClick={publish}
            >
              Publish
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
