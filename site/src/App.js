import React from "react";
import { useState, useEffect } from "react";
import Nav from "./nav";
import Routes from "./routes";
import axios from "axios";
import "./App.css";

export default function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data.userSign);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(228, 243, 245, 0.6)",
        minHeight: "1000px",
      }}
    >
      <Nav user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </div>
  );
}
