import React from "react";
import { useState } from "react";
import "./css/nav.scss";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "./redux/actions/";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Nav({ setUser }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const history = useHistory();

  const LogOut = () => {
    localStorage.clear();
    setUser(null);
    dispatch(LogoutUser());
    history.push("/");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div class="navbar-brand-small" onClick={() => history.push("/")}>
        <span style={{ fontFamily: "Lobster", fontSize: "4rem" }} className="">
          Clarity
        </span>
      </div>
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

      <div
        class="collapse navbar-collapse text-center justify-content-between"
        id="navbarSupportedContent"
      >
        <div
          class="navbar-brand navbar-brand-big"
          onClick={() => history.push("/")}
        >
          <h2
            style={{
              fontFamily: "Lobster",
              fontSize: "4rem",
              cursor: "pointer",
            }}
            className="mx-1"
          >
            Clarity
          </h2>
        </div>
        <form
          className="nav-input"
          onSubmit={() => history.push(`/search/${search}`)}
        >
          <input
            class="form-control form-control-dark nav-search"
            type="text"
            placeholder="Search for users..."
            aria-label="Search"
            onChange={handleChange}
          ></input>
        </form>

        {user.loggedIn ? (
          <div className="nav-buttons d-flex justify-content-between">
            <Button
              variant="outline-primary"
              onClick={() => history.push("/write")}
            >
              Write a Blog
            </Button>
            <Button
              variant="outline-danger"
              className="mx-2"
              onClick={() => history.push("/profile")}
            >
              Profile
            </Button>
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
              Sign In
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
