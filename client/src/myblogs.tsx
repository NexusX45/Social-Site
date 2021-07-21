import React from "react";
import { useEffect, useState } from "react";
import BlogTiles from "./components/blogtiles";
import { getMyBlogs } from "./services/service";

export default function Myblogs() {
  const [blogs, setBlogs] = useState([{ title: "", body: "", _id: "" }]);

  useEffect(() => {
    getMyBlogs().then((blogs) => setBlogs(blogs));
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
