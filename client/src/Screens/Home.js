import React from "react";
import Header from "../Component/Layout/header/index";
import Footer from "../Component/Layout/Footer/Footer";
import Body from "../Pages/_routes";
import { Route, Switch } from "react-router-dom";
import RoutesStudent from "../Pages/_routesStudent";
import RoutesTeacher from "../Pages/_routesTeacher";
import NotFound from "../Component/Layout/NotFound/NotFound";

const Home = () => {
  return (
    <>
      <Switch>
        <Route path="/home">
          <Header />
          <Body />
          <Footer />
        </Route>
        <Route path="/sign-in">
          <Body />
        </Route>
        <Route path="/sign-up">
          <Body />
        </Route>
        <Route path="/student-workspace">
          <RoutesStudent />
        </Route>
        <Route path="/teacher-workspace">
          <RoutesTeacher />
        </Route>
        <Route path="/notfound">
          <NotFound />
        </Route>
        <Route path="/about-us">
          <Header />
          <Body />
          <Footer />
        </Route>
      </Switch>
    </>
  );
};
export default Home;
