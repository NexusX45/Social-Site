import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogTiles from "./components/blogtiles";

export default function Myblogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.post("/api/blog/myblogs").then((res) => {
      console.log(res);
      setBlogs(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="h2 my-3">My Blogs</div>
      <div>
        {blogs.map((blog) => (
          <BlogTiles title={blog.title} body={blog.body} id={blog._id} />
        ))}
      </div>
    </div>
  );
}
