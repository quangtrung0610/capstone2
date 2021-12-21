import React from "react";

import TestandQuizzes from "../Component/testAndQuizzes/testAndQuizzes";

const TestandQuizzesPage = () => {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: "100%", borderRadius: "30px" }}
    >
      <TestandQuizzes />
    </div>
  );
};

export default TestandQuizzesPage;
