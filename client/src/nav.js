import Axios from "axios";
import React from "react";
import { useState } from "react";
import "./css/nav.scss";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "./redux/actions/";

export default function Nav({ setUser }) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  const LogOut = () => {
    localStorage.clear();
    setUser(null);
    dispatch(LogoutUser());
  };

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      Axios.get("/api/author/search/" + e.target.value)
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
      <a class="navbar-brand navbar-brand-small" href="/">
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

      <div
        class="collapse navbar-collapse text-center justify-content-between"
        id="navbarSupportedContent"
      >
        <a class="navbar-brand navbar-brand-big" href="/">
          <h2
            style={{ fontFamily: "Lobster", fontSize: "4rem" }}
            className="mx-3 pr-3"
          >
            Clarity
          </h2>
        </a>
        {/* <ul class="navbar-nav mr-auto">
          <li class="nav-item active"></li>
        </ul> */}
        <div className=" nav-input" style={{ position: "relative" }}>
          <input
            class="form-control form-control-dark"
            type="text"
            placeholder="Search for users..."
            aria-label="Search"
            onChange={handleSearch}
          ></input>
          {show ? (
            <div className="search-results">
              {results.map((name) => (
                <a
                  href={"/author/" + name._id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="lead my-1 hover">
                    <div
                      class="mx-2"
                      style={{
                        color: "black",
                        width: "100%",
                      }}
                    >
                      {name.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        {user ? (
          <div className="nav-buttons d-flex justify-content-around">
            <a class="p-2 text-dark" href="/write">
              Write
            </a>
            <a class="p-2 text-dark mr-2" href="/profile">
              {user.user_data.name}
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
              Sign In
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
