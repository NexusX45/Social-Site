import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./about";
import Signup from "./signup";
import Signin from "./signin";
import Home from "./home";
import React from "react";
import Profile from "./profile";
import Feed from "./feed";
import Write from "./write";
import Blog from "./blog";
import Author from "./author";
import Myblogs from "./myblogs";
import UpdateBlog from "./updateblog";

export default function Routes({ user, setUser }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Feed /> : <Home />}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/signin">
          {user ? (
            <Redirect to="/" />
          ) : (
            <Signin setUser={setUser} user={user} />
          )}
        </Route>
        <Route path="/signup">
          {user ? <Redirect to="/" /> : <Signup setUser={setUser} />}
        </Route>
        <Route path="/profile">
          {user ? <Profile /> : <Signin setUser={setUser} user={user} />}
        </Route>
        <Route path="/write">
          {user ? <Write /> : <Signin setUser={setUser} user={user} />}
        </Route>
        <Route
          path="/blog/:id"
          render={(props) => <Blog user={user} id={props.match.params.id} />}
        />
        <Route path="/author/:id" component={Author} />
        <Route path="/myblog">
          {user ? <Myblogs /> : <Signin setUser={setUser} user={user} />}
        </Route>
        <Route path="/update/:id" component={UpdateBlog} />
      </Switch>
    </Router>
  );
}
