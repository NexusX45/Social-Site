import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.length == 0) {
      history.push("/signin");
    } else {
      axios
        .get("http://127.0.0.1:4000/profile", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.userSign);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div>
      <div className="container lead my-3">
        <table>
          <tr>
            <td>Email</td>
            <td>
              <span className="mx-2">:</span>
            </td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <span className="mx-2">:</span>
            </td>
            <td>{user.name}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
