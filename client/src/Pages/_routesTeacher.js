import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeWorkspacePage from "./HomeWorkspace";
import SchedulePage from "./Schedule";
import TestandQuizzes from "./TestandQuizzes";

const RoutesTeacher = () => {
  return (
    <Switch>
      <Route path="/teacher-workspace/schedule">
        <SchedulePage />
      </Route>
      <Route path="/teacher-workspace/testandquizzes">
        <TestandQuizzes />
      </Route>
      <Route path="/teacher-workspace">
        <HomeWorkspacePage />
      </Route>
    </Switch>
  );
};

export default RoutesTeacher;
