import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import "./css/signin.css";

export default function Signin({ setUser, user }) {
  const history = useHistory();
  const email = React.createRef();
  const password = React.createRef();

  const [show, setShow] = useState(false);
  const sub = () => {
    axios
      .post("http://127.0.0.1:4000/signin", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        if (res.data == "Invalid") {
          setShow(true);
        } else {
          setShow(false);
          localStorage.setItem("token", res.data.token);

          axios
            .get("http://127.0.0.1:4000/profile", {
              headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
              console.log(res.data.user);
              setUser(res.data.user);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("submited");
  };

  return (
    <div>
      <br />
      <h2 class="display-4 text-center">Sign In</h2>
      <br />
      <div class="text-center">
        <form>
          <span class="text-dark" style={{ padding: "14px" }}>
            Email:
          </span>
          <input type="email" ref={email}></input>
          <br />
          <span class="text-dark">Password:</span>
          <input type="password" ref={password}></input>
          <br />
          {show ? <div class="invalid">Invalid Credentials</div> : <div></div>}
        </form>
        <button onClick={sub}>Submit</button>
      </div>
    </div>
  );
}
