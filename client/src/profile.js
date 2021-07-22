import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getProfile } from "./services/service";

export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.length === 0) {
      history.push("/signin");
    } else {
      getProfile()
        .then((profile) => {
          setUser(profile.userSign);
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
