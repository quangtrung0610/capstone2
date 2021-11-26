import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeWorkspacePage from "./HomeWorkspace";
import SchedulePage from "./Schedule";
import TestandQuizzes from "./TestandQuizzes";

const RoutesStudent = () => {
  return (
    <Switch>
      <Route path="/student-workspace/schedule">
        <SchedulePage />
      </Route>
      <Route path="/student-workspace/testandquizzes">
        <TestandQuizzes />
      </Route>
      <Route path="/student-workspace">
        <HomeWorkspacePage />
      </Route>
    </Switch>
  );
};

export default RoutesStudent;
