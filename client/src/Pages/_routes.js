import React from "react";
import Login from "../Component/Login/Login";
import Register from "../Component/Login/Register";
import { Route, Switch } from "react-router-dom";
import Forgot from "../Component/Login/forgot";
import Home from "../Component/Home/Index";
import AboutUs from "../Component/AbouUs/AboutUs";
import NotFound from "../Component/Layout/NotFound/NotFound";

const Body = () => {
  return (
    <Switch>
      <Route exact path="/sign-in">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <Register />
      </Route>
      <Route exact path="/forget-password">
        <Forgot />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/about-us">
        <AboutUs />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};
export default Body;
