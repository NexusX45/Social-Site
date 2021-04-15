import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
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
import Search from "./search";

export default function Routes({ setUser }) {
  const user = useSelector((state) => state.user);
  return (
    <Switch>
      <Route exact path="/">
        {user.loggedIn ? <Feed /> : <Home />}
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/signin">
        {user.loggedIn ? (
          <Redirect to="/" />
        ) : (
          <Signin setUser={setUser} user={user} />
        )}
      </Route>
      <Route path="/signup">
        {user.loggedIn ? <Redirect to="/" /> : <Signup setUser={setUser} />}
      </Route>
      <Route path="/profile">
        {user.loggedIn ? <Profile /> : <Signin setUser={setUser} user={user} />}
      </Route>
      <Route path="/write">
        {user.loggedIn ? <Write /> : <Signin setUser={setUser} user={user} />}
      </Route>
      <Route
        path="/blog/:id"
        render={(props) => <Blog id={props.match.params.id} />}
      />
      <Route path="/author/:id" component={Author} />
      <Route path="/myblog">
        {user.loggedIn ? <Myblogs /> : <Signin setUser={setUser} />}
      </Route>
      <Route path="/search/:q" component={Search} />
      <Route path="/update/:id" component={UpdateBlog} />
    </Switch>
  );
}
