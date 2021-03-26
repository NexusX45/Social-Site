import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.length === 0) {
      history.push("/signin");
    } else {
      axios
        .get(`/user/profile`, {
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
  }, [history]);
  return (
    <div>
      <div className="container lead my-3">
        <Card>
          <Card.Body>
            <div className="mx-auto mb-3 h2">Profile</div>
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
            <div className="my-3">
              <a href="/myblog" className="lead ">
                Go to My Blogs
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
