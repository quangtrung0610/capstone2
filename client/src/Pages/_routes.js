import React from "react";
import Login from "../Component/Login/Login";
import Register from "../Component/Login/Register";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "../Component/Home/Index";
import Header_About from "../Component/AbouUs/Header_About";
import Footer_AboutUs from "../Component/AbouUs/Footer_AboutUs";

const Body = () => {
  return (
    <Switch>
      <Route path="/sign-in">
        <Login />
      </Route>
      <Route path="/sign-up">
        <Register />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/about-us">
        <Header_About />
        <Footer_AboutUs />
      </Route>
    </Switch>
  );
};
export default Body;
