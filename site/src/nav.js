import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./css/nav.css";

export default function Nav({ user, setUser }) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  const LogOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleSearch = (e) => {
    if (e.target.value != "") {
      Axios.get("http://localhost:4000/search?name=" + e.target.value)
        .then((res) => {
          console.log(res);
          setResults(res.data);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShow(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <a class="navbar-brand" href="/">
        <h2
          style={{ fontFamily: "Lobster", fontSize: "4rem" }}
          className="mx-3 pr-3"
        >
          Clarity
        </h2>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark mx-2"
        type="text"
        placeholder="Search for users..."
        aria-label="Search"
        style={{ width: "60%" }}
        onChange={handleSearch}
      ></input>
      <div
        style={{
          width: "300px",
          position: "fixed",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          height: "300px",
          left: "270px",
          top: "75px",
        }}
        className={show ? "visible" : "not_visible"}
      >
        {results.map((name) => (
          <div className="lead my-1 hover">
            <a
              class="mx-2"
              style={{ textDecoration: "none", color: "black" }}
              href={"author/" + name._id}
            >
              {name.name}
            </a>
          </div>
        ))}
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active"></li>
        </ul>
        {user ? (
          <div>
            <a class="p-2 text-dark" href="/write">
              Write
            </a>
            <a class="p-2 text-dark mr-2" href="/profile">
              {user.name}
            </a>
            <button class="btn btn-secondary" onClick={LogOut}>
              Log out
            </button>
          </div>
        ) : (
          <div>
            {" "}
            <a class="p-2 text-dark" href="/about">
              Subscribe
            </a>
            <a class="p-2 text-dark" href="/signin">
              {user ? user.name : "Sign In"}
            </a>
            <a class="p-2 text-dark" href="/write">
              Write
            </a>
            <a
              style={{ backgroundColor: "#55b0c9", border: "none" }}
              class="btn btn-primary btn-md"
              href="/signup"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
