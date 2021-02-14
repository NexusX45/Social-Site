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
      "http://127.0.0.1:4000/write",
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
      <div class="h2 mt-3 mb-5">Write a blog</div>
      <Card style={{ width: "70%" }}>
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
              placeholder="Title goes here..."
              ref={title}
            ></input>
          </div>
          <div className="my-3 d-flex">
            <textarea
              className="mx-3 lead"
              style={{
                width: "80%",
                height: "500px",
                border: "none",
                outline: "none",
                resize: "none",
              }}
              ref={body}
              placeholder="Write your content here..."
            ></textarea>
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
