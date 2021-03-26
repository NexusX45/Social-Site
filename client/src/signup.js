import React from "react";

import axios from "axios";

export default function Signup({ setUser }) {
  const name = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const conf_password = React.createRef();

  const sub = () => {
    axios
      .post("/user/signup", {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        axios
          .get("/user/profile", {
            headers: { Authorization: localStorage.getItem("token") },
          })
          .then((res) => {
            console.log(res);
            setUser(res.data.user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("submited");
  };

  return (
    <div>
      <br />
      <div class="container">
        <h2 class="display-4 mb-5 mt-3">Sign Up</h2>
        <form class="mb-4">
          <table>
            <tr>
              <td>
                <span class="text-dark">Name:</span>
              </td>
              <td>
                <input type="email" class="" ref={name}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark">Email:</span>
              </td>
              <td>
                <input type="email" class="" ref={email}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark">Password:</span>
              </td>
              <td>
                <input type="password" class="mr-3" ref={password}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark mr-2">Confirm Password:</span>
              </td>
              <td>
                <input type="password" ref={conf_password}></input>
              </td>
            </tr>
          </table>
        </form>
        <button onClick={sub} class="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
