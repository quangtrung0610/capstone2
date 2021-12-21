import React, { useState } from "react";

import CreateQuiz from "../Component/testAndQuizzes/createQuiz";

const CreateQuizPage = () => {
  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
        minHeight: "100%",
        borderRadius: "30px",
        display: "flex",
      }}
    >
      <CreateQuiz />
    </div>
  );
};

export default CreateQuizPage;
