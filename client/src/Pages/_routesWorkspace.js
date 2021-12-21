//import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeWorkspacePage from "./HomeWorkspace";
import SchedulePage from "./Schedule";
import TestandQuizzesPage from "./TestandQuizzes";
import TeamworkPage from "./TeamworkPage";
import ProfilePage from "./profile";
import TranscriptPage from "./Transcript";
import TranscriptClassPage from "./TranscriptClass";
import SelectQuizPage from "./SelectQuiz";

import ScheduleTeacherPage from "./ScheduleTeacher";
import ProfileTeacherPage from "./ProfileTeacher";
import SelectClassPage from "./SelectClasses";
import InsertScorePage from "./InsertScores";
import CreateQuizPage from "./CreateQuiz";

const RoutesWorkspace = () => {
  return (
    <Switch>
      <Route exact path="/student-workspace/schedule">
        <SchedulePage />
      </Route>
      <Route exact path="/student-workspace/testandquizzes">
        <SelectQuizPage />
      </Route>
      <Route exact path="/student-workspace/testandquizzes/:test_id">
        <TestandQuizzesPage />
      </Route>
      <Route exact path="/student-workspace/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/student-workspace/teamwork/working">
        <TeamworkPage />
      </Route>
      <Route exact path="/student-workspace/transcript/personal">
        <TranscriptPage />
      </Route>
      <Route exact path="/student-workspace/transcript/class">
        <TranscriptClassPage />
      </Route>
      <Route exact path="/student-workspace">
        <HomeWorkspacePage />
      </Route>
      <Route exact path="/teacher-workspace/schedule">
        <ScheduleTeacherPage />
      </Route>
      <Route exact path="/teacher-workspace/testandquizzes">
        <CreateQuizPage />
      </Route>
      <Route exact path="/teacher-workspace/profile">
        <ProfileTeacherPage />
      </Route>
      <Route exact path="/teacher-workspace/transcript">
        <SelectClassPage />
      </Route>
      <Route exact path="/teacher-workspace/transcript/:class_id">
        <InsertScorePage />
      </Route>
      <Route exact path="/teacher-workspace">
        <HomeWorkspacePage />
      </Route>
    </Switch>
  );
};

export default RoutesWorkspace;
