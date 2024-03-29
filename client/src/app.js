import React from "react";
import { useState, useEffect } from "react";
import Nav from "./nav";
import Routes from "./routes";
import axios from "axios";
import "./css/app.css";
import { useDispatch } from "react-redux";
import { LoginUser } from "./redux/actions";
import { Route, BrowserRouter as Router } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      axios
        .get("/api/user/profile")
        .then((res) => {
          setUser(res.data.userSign);
          dispatch(LoginUser(res.data.userSign));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  return (
    <Router>
      <Route>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            minHeight: "1000px",
          }}
        >
          <Nav user={user} setUser={setUser} />
          <Routes user={user} setUser={setUser} />
        </div>
      </Route>
    </Router>
  );
}
