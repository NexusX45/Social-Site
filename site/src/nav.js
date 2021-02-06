import React from "react";
import { useHistory } from "react-router-dom";

export default function Nav({ user, setUser }) {
  const history = useHistory();
  const LogOut = () => {
    localStorage.clear();
    setUser(null);
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
        placeholder="Search"
        aria-label="Search"
        style={{ width: "70%" }}
      ></input>

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
