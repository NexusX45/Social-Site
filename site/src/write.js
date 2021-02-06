import React from "react";
import axios from "axios";

export default function Write() {
  const title = React.createRef();
  const body = React.createRef();
  const picture =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";

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
  };

  return (
    <div className="container">
      <div class="h2 my-3">Write a blog</div>
      <div className="my-3 d-flex">
        <text className="mt-1">Title :</text>
        <input className="mx-3" style={{ width: "50%" }} ref={title}></input>
      </div>
      <div className="my-3 d-flex" style={{ height: "500px" }}>
        <text className="mt-1">Body :</text>
        <textarea
          className="mx-3"
          style={{ width: "60%", height: "100%" }}
          ref={body}
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
    </div>
  );
}
