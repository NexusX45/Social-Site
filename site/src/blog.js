import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog(props) {
  const [data, setData] = useState([]);
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
  }, []);

  return (
    <div className="container">
      <div className="h3 my-3">{data.title}</div>
      <div className="lead">{data.body}</div>
    </div>
  );
}
