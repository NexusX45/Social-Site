import React from "react";
import { useState } from "react";
import { LoginUser } from "./redux/actions/index";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import axios from "axios";

import "./css/signin.css";

export default function Signin({ setUser }) {
  const email = React.createRef();
  const password = React.createRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const sub = () => {
    axios
      .post(`http://127.0.0.1:${process.env.PORT}/user/signin`, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "Invalid") {
          setShow(true);
        } else {
          setShow(false);
          localStorage.setItem("token", res.data.token);

          axios
            .get(`http://127.0.0.1:${process.env.PORT}/user/profile`, {
              headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
              console.log(res.data.userSign);
              setUser(res.data.userSign);
              dispatch(LoginUser(res.data.userSign));
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
        <Button onClick={sub} className="my-3">
          Submit
        </Button>
      </div>
    </div>
  );
}
