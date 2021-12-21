import { Card } from "antd";
import React, { useState, Fragment } from "react";
import Question from "./Question";

const CreateQuiz = () => {
  const [questionList, setQuestionList] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const addQuestion = () => {
    setQuestionList(
      questionList.concat(
        <>
          {" "}
          <Card
            title={questionTitle}
            bordered={false}
            style={{ width: "100% " }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <br />
        </>
      )
    );
  };

  return (
    <>
      <div className="toolbar">
        <div className="tool-section tool-section--lrg"></div>

        <div>
          <button className="btn btn--main btn--block" onClick={addQuestion}>
            Add Question
          </button>
          <button className="btn btn--block">Clear</button>
        </div>
      </div>
      <div className="site-card-border-less-wrapper">{questionList}</div>
    </>
  );
};
export default CreateQuiz;
