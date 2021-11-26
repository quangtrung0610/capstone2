import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Question from "./Question";
import ResultModal from "./ResultModal";

const TestAndQuizzes = () => {
  const [getTitle, setTitle] = useState([]);
  const [getQuestion, setGetQuestion] = useState([]);
  const [getOption, setgetOption] = useState([]);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [questionsAndOptions, setQuestionsAndOptions] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:1337/api/get/testandquizzes/title", {
      class_id: "3A",
    }).then((response) => {
      setTitle(response.data.result);
    });

    Axios.get("http://localhost:1337/api/get/testandquizzes/question").then(
      (response) => {
        setGetQuestion(response.data);
      }
    );
  }, []);
  console.log("data:" + getQuestion);
  console.log("option:" + getTitle);
  useEffect(() => {
    createQuestionAndOptions();
  }, [getQuestion, getOption]);

  const title = getTitle.map((val) => {
    return val.nameOfTest;
  });
  console.log("title: " + title);

  const note = getTitle.map((val) => {
    return val.note;
  });

  const numberOfQuestions = getTitle.map((val) => {
    return val.numberOfQuestions;
  });

  //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      const numberOfQuestions = getTitle[0].numberOfQuestions;

  const createQuestionAndOptions = () => {
    const questionsAndOptionsGenerated = getQuestion.map(
      (question, questionIndex) => {
        //setcountQustion(question.question_id);
        const questionGenerated = {
          _id: questionIndex,
          name: "Question: " + question.question.question_title + "?",
          trueOption: question.question.trueOption,
          selectedOption: "",
        };
        const optionsGenerated = [...question.options].map(
          (option, optionIndex) => {
            const optionGenerated = {
              _id: optionIndex + 1,
              name: option.optionData,
            };
            return optionGenerated;
          }
        );

        return {
          ...questionGenerated,
          options: optionsGenerated,
        };
      }
    );
    //console.log(questionsAndOptionsGenerated);

    setQuestionsAndOptions(questionsAndOptionsGenerated);
  };
  function checkOption(questionId, optionId) {
    const updatedQuestionAndOptions = questionsAndOptions.map((question) => {
      if (question._id === questionId) {
        question.selectedOption = optionId;
        setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
        if (question.selectedOption == question.trueOption) {
          setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        }
      }
      return question;
    });
    setQuestionsAndOptions(updatedQuestionAndOptions);
  }

  function testAgain() {
    window.location.reload();
  }
  return (
    <div className="app">
      {numberOfAnsweredQuestions == numberOfQuestions ? (
        <ResultModal
          correct={numberOfCorrectAnswers}
          incorrect={numberOfQuestions - numberOfCorrectAnswers}
          numberOfQuestion={numberOfQuestions}
          testAgain={testAgain}
        />
      ) : null}
      <Navbar collapseOnSelect expand="lg" bg={"light"} fixed={"top"}>
        <Navbar.Brand href="#home">Test your luck</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="#deets" className="number">
            {numberOfAnsweredQuestions}/{numberOfQuestions}
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container>
        <h1>{title}</h1>
        <p className="role">{note}</p>
        {questionsAndOptions.map((question) => {
          return (
            <Question
              question={question}
              checkOption={(questionId, optionId) =>
                checkOption(questionId, optionId)
              }
            />
          );
        })}
      </Container>
    </div>
  );
};

export default TestAndQuizzes;
