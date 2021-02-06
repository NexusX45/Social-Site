import React from "react";
import { useState, useEffect } from "react";
import Nav from "./nav";
import Routes from "./routes";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </div>
  );
}
